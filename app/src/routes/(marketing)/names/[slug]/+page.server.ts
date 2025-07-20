import { fail } from "@sveltejs/kit"

/** @type {import('./$types').Actions} */
export const actions = {
  submitNamePreference: async ({
    request,
    locals: { supabaseServiceRole, safeGetSession },
  }) => {
    const data = await request.formData()
    const { session } = await safeGetSession()
    const errors: { [fieldName: string]: string } = {}

    const name: string = data.get("name")?.toString() ?? ""
    if (name.length < 1) {
      errors["name"] = "Name is required"
    }
    if (name.length > 500) {
      errors["name"] = "Name is too long"
    }
    if (name === "Nice Work!") {
      // Ignore Fallback name value
      return
    }

    const preference: string = data.get("preference")?.toString() ?? ""
    if (preference.length < 1) {
      errors["preference"] = "Preference is required"
    }
    if (!["like", "dislike", "super", "none"].includes(preference)) {
      errors["preference"] = "Preference must be one of allowed values"
    }

    const gender: string = data.get("gender")?.toString() ?? ""
    if (gender.length < 1) {
      errors["gender"] = "Gender is required"
    }
    if (!["feminine", "masculine", "neutral"].includes(gender)) {
      errors["gender"] = "Gender must be one of allowed values"
    }

    if (Object.keys(errors).length > 0) {
      return fail(400, { errors })
    }

    // Save to database
    const { error: insertNamePreferenceError } = await supabaseServiceRole
      .from("name_preferences")
      .upsert({
        user_id: session?.user.id,
        name: name,
        gender: gender,
        preference: preference,
        updated_at: new Date(),
        unique: `${session?.user.id}-${name}-${gender}`,
      })

    if (insertNamePreferenceError) {
      console.error("Error saving name preference", insertNamePreferenceError)
      return fail(500, { errors: { _: "Error saving" } })
    }
  },
}
