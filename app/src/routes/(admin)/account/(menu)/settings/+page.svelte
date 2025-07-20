<script lang="ts">
  import SettingsModule from "./settings_module.svelte"
  import AccountNavigation from "../../AccountNavigation.svelte"

  let { data } = $props()
  let { profile, user } = data
</script>

<svelte:head>
  <title>Settings</title>
</svelte:head>

<div class="flex flex-col items-center justify-center">
  <AccountNavigation active="settings" />

  <h1 class="text-2xl font-bold pt-6">Settings</h1>

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
