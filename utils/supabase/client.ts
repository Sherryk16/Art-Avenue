export function createClient(): never {
  throw new Error(
    'Direct Supabase client access from the browser is not allowed. ' +
    'Use fetch(\'/api/portfolio\') instead.'
  )
}
