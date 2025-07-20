<script lang="ts">
  // @ts-ignore
  import IconMatches from "~icons/fa6-solid/heart"
  // @ts-ignore
  import IconSettings from "~icons/fa6-solid/gear"
  // @ts-ignore
  import IconBilling from "~icons/fa6-solid/file-invoice-dollar"

  export let active = ""
</script>

<div role="tablist" class="tabs tabs-border">
  <a
    role="tab"
    class="tab w-28 {active === 'settings' ? 'tab-active' : ''}"
    href="/account/settings"
    ><span class="px-1.5"><IconSettings /></span>Admin</a
  >
  <a
    role="tab"
    class="tab w-28 {active === 'account' ? 'tab-active' : ''}"
    href="/account"><span class="px-1.5"><IconMatches /></span>Likes</a
  >
  <a
    role="tab"
    class="tab w-28 {active === 'billing' ? 'tab-active' : ''}"
    href="/account/billing"
    ><span class="px-1.5"><IconBilling /></span>Billing</a
  >
</div>
