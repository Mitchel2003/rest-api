export type Error = string
export type Result<T, E> = { value: T } | { error: E } //type Either