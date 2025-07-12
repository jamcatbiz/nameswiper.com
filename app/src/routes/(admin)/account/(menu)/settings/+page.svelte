<script lang="ts">
  import { getContext } from "svelte"
  import type { Writable } from "svelte/store"
  import SettingsModule from "./settings_module.svelte"

  // @ts-ignore
  import IconMatches from "~icons/fa6-solid/heart"
  // @ts-ignore
  import IconSettings from "~icons/fa6-solid/gear"
  // @ts-ignore
  import IconBilling from "~icons/fa6-solid/file-invoice-dollar"

  let adminSection: Writable<string> = getContext("adminSection")
  adminSection.set("settings")

  let { data } = $props()
  let { profile, user } = data
</script>

<svelte:head>
  <title>Settings</title>
</svelte:head>

<div class="flex flex-col items-center justify-center">
  <div role="tablist" class="tabs tabs-border">
    <a role="tab" class="tab tab-active" href="/account/settings"
      ><IconSettings /></a
    >
    <a role="tab" class="tab" href="/account"><IconMatches /></a>
    <a role="tab" class="tab" href="/account/billing"><IconBilling /></a>
  </div>

  <h1 class="text-2xl font-bold mb-6">Settings</h1>

  <SettingsModule
    title="Profile"
    editable={false}
    fields={[
      { id: "fullName", label: "Name", initialValue: profile?.full_name ?? "" },
    ]}
    editButtonTitle="Edit Profile"
    editLink="/account/settings/edit_profile"
  />

  <SettingsModule
    title="Email"
    editable={false}
    fields={[{ id: "email", initialValue: user?.email || "" }]}
    editButtonTitle="Change Email"
    editLink="/account/settings/change_email"
  />

  <SettingsModule
    title="Password"
    editable={false}
    fields={[{ id: "password", initialValue: "••••••••••••••••" }]}
    editButtonTitle="Change Password"
    editLink="/account/settings/change_password"
  />

  <SettingsModule
    title="Email Subscription"
    editable={false}
    fields={[
      {
        id: "subscriptionStatus",
        initialValue: profile?.unsubscribed ? "Unsubscribed" : "Subscribed",
      },
    ]}
    editButtonTitle="Change Subscription"
    editLink="/account/settings/change_email_subscription"
  />

  <SettingsModule
    title="Danger Zone"
    editable={false}
    dangerous={true}
    fields={[]}
    editButtonTitle="Delete Account"
    editLink="/account/settings/delete_account"
  />
</div>
