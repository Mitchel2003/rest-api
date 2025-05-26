import { Curriculum } from "@/types/form/curriculum/curriculum.type";
import mongoose, { Schema } from "mongoose";
import configSchema from "@/utils/schema";

const curriculumSchema: Schema<Curriculum> = new Schema({
  inventory: { type: String, required: false, unique: true, index: true },

  //standard
  name: { type: String, required: true },
  brand: { type: String, required: true },
  serie: { type: String, required: true },
  service: { type: String, required: true },
  modelEquip: { type: String, required: true },
  healthRecord: { type: String, required: true },
  photoUrl: { type: String, required: false },
  metadata: { type: Object, required: false, default: {} },

  //standard technical
  characteristics: { type: String, required: true },
  recommendationsManufacturer: { type: String, required: true },

  //details
  datePurchase: { type: String, required: false },
  dateInstallation: { type: String, required: false },
  dateOperation: { type: String, required: false },
  acquisition: { type: String, required: true },
  warranty: { type: String, required: true },
  price: { type: String, required: true },

  //equipment
  useClassification: { type: String, required: true },
  typeClassification: { type: String, required: true },
  equipClassification: { type: String, required: true },
  riskClassification: { type: String, required: false },
  biomedicalClassification: { type: String, required: false },
  technologyPredominant: [{ type: String, required: true }],
  powerSupply: [{ type: String, required: true }],

  //technical characteristics
  technicalCharacteristics: { type: Object, required: false, default: {} },

  //maintenance
  employmentMaintenance: { type: String, required: true },
  frequencyMaintenance: { type: String, required: true },
  typeMaintenance: [{ type: String, required: true }],
  manualsMaintenance: [{ type: String, required: true }],

  //relationship
  office: {
    type: Schema.Types.ObjectId,
    ref: 'office',
    required: true
  },
  inspection: {
    type: Schema.Types.ObjectId,
    ref: 'inspection',
    required: true
  },
  representative: {
    type: Schema.Types.ObjectId,
    ref: 'representative',
    required: true
  },
  supplier: {
    type: Schema.Types.ObjectId,
    ref: 'supplier',
    required: true
  },
  manufacturer: {
    type: Schema.Types.ObjectId,
    ref: 'manufacturer',
    required: true
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  }
}, configSchema);

// Index for performance
curriculumSchema.index({ 'office': 1, createdAt: -1 }); // Search by office and date
curriculumSchema.index({ service: 1 }); // Search by service

//pre-save hook to generate inventory code if not provided
curriculumSchema.pre('save', async function (next) {
  try {
    if (this.isModified('inventory')) return next()
    if (!this.office) return next(new Error('Office required'))
    const Headquarter = mongoose.model('headquarter');
    const Office = mongoose.model('office');
    const Client = mongoose.model('client');

    //get office, headquarter and client
    const office = await Office.findById(this.office);
    if (!office) return next(new Error('Office not found'))
    const headquarter = await Headquarter.findById(office.headquarter);
    if (!headquarter) return next(new Error('Headquarter not found'))
    const client = await Client.findById(headquarter.client);
    if (!client) return next(new Error('Client not found'))

    //get code (or generate if not exists)
    const clientCode = client.inventory || await getClientInventory(client._id);
    const headquarterCode = headquarter.inventory || await getHeadquarterInventory(headquarter._id);
    const officeCode = office.inventory || await getOfficeInventory(office._id);

    //generate equipment serial number and create the inventory code
    const curriculumCode = await getCurriculumInventory(this.office);
    this.inventory = `${String(clientCode)}-${String(headquarterCode)}-${String(officeCode)}-${curriculumCode}`;
    next();
  } catch (error) { next(error instanceof Error ? error : new Error(String(error))) }
})

export default mongoose.model('curriculum', curriculumSchema)
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------tools--------------------------------------------------*/
/**
 * Generate next client code according to the client existing
 * @param {mongoose.Types.ObjectId | string} clientId client id
 * @returns {Promise<string>} new client code
 */
async function getClientInventory(clientId: mongoose.Types.ObjectId | string): Promise<string> {
  const Client = mongoose.model('client');
  const client = await Client.findById(clientId);
  if (!client.inventory) {
    //count existing clients and generate next code (Base-36 encoding)
    const count = await Client.countDocuments(); //count existing clients
    const nextCode = (count + 1).toString(36).toUpperCase().padStart(2, '0');
    await Client.findByIdAndUpdate(clientId, { inventory: nextCode });
    return nextCode;
  }
  return client.inventory;
}

/**
 * Generate next headquarter code according to the headquarter existing
 * @param {mongoose.Types.ObjectId | string} headquarterId headquarter id
 * @returns {Promise<string>} new headquarter code
 */
async function getHeadquarterInventory(headquarterId: mongoose.Types.ObjectId | string): Promise<string> {
  const Headquarter = mongoose.model('headquarter');
  const hq = await Headquarter.findById(headquarterId);
  if (!hq.inventory) {
    //count existing headquarter and generate next code (Base-36 encoding)
    const count = await Headquarter.countDocuments({ client: hq.client });
    const nextCode = (count + 1).toString(36).toUpperCase().padStart(3, '0');
    await Headquarter.findByIdAndUpdate(headquarterId, { inventory: nextCode });
    return nextCode;
  }
  return hq.inventory;
}

/**
 * Generate next office code according to the office existing
 * @param {mongoose.Types.ObjectId | string} officeId office id
 * @returns {Promise<string>} new office code
 */
async function getOfficeInventory(officeId: mongoose.Types.ObjectId | string): Promise<string> {
  const Office = mongoose.model('office');
  const office = await Office.findById(officeId);
  if (!office.inventory) {
    //count existing offices and generate next code (Base-36 encoding)
    const count = await Office.countDocuments({ headquarter: office.headquarter });
    const nextCode = (count + 1).toString(36).toUpperCase().padStart(3, '0');
    await Office.findByIdAndUpdate(officeId, { inventory: nextCode });
    return nextCode;
  }
  return office.inventory;
}

/**
 * Generate next curriculum code according to the curriculum existing
 * @param {mongoose.Types.ObjectId | string} officeId office id
 * @returns {Promise<string>} new curriculum code
 */
async function getCurriculumInventory(officeId: Schema.Types.ObjectId): Promise<string> {
  const Curriculum = mongoose.model('curriculum');
  //count existing equipments and generate next code (Base-36 encoding)
  const count = await Curriculum.countDocuments({ office: officeId });
  return (count + 1).toString().padStart(4, '0');
}