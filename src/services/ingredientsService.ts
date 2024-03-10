import { supabase } from "./supabase"

async function findByIds(ids: string[]) {
  const { data } = await supabase
    .from("ingredients")
    .select()
    .in("id", ids)
    .order("name")
    .returns<IngredientResponse[]>()

  return data ?? []
}

async function findByRecipeId(id: string) {
  const { data } = await supabase
    .from("recipe_ingredients")
    .select("id, ingredients (id, name, image)")
    .eq("recipe_id", id)
    .returns<{ ingredients: IngredientResponse }[]>()
  console.log(id)
  return data ? data.map((item) => item.ingredients) : []
}

async function findAll() {
  const { data } = await supabase
    .from("ingredients")
    .select()
    .order("name")
    .returns<IngredientResponse[]>()

  return data ?? []
}

export { findAll, findByIds, findByRecipeId }