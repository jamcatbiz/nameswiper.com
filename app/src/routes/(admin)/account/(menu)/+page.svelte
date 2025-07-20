<script lang="ts">
  import AccountNavigation from "../AccountNavigation.svelte"

  // @ts-ignore
  import IconMasculine from "~icons/fa6-solid/mars"
  // @ts-ignore
  import IconFeminine from "~icons/fa6-solid/venus"
  // @ts-ignore
  import IconNeutral from "~icons/fa6-solid/mars-and-venus"
  // @ts-ignore
  import IconLike from "~icons/fa6-solid/heart"
  // @ts-ignore
  import IconDislike from "~icons/fa6-regular/heart"
  // @ts-ignore
  import IconSuperLike from "~icons/fa6-solid/star"

  let { data } = $props()
  let { name_preferences, user } = data
</script>

<svelte:head>
  <title>Account</title>
</svelte:head>

<div class="flex flex-col items-center justify-center">
  <AccountNavigation active="account" />

  <div class="flex items-left text-left">
    <h1 class="text-2xl font-bold pt-6 mb-1">Your Likes</h1>
  </div>

  <div class="h-100 w-80 overflow-x-auto">
    <table class="table table-pin-rows table-xs">
      <thead>
        <tr>
          <th>Name</th>
          <th><IconNeutral class="text-purple-300" /></th>
          <th><IconLike class="text-red-300" /></th>
        </tr>
      </thead>
      <tbody>
        {#each [...name_preferences].reverse() as name_preference}
          <tr>
            <td
              ><a
                class="btn btn-link text-base-content"
                href="/names/{encodeURIComponent(name_preference.name)}"
                >{name_preference.name}</a
              ></td
            >
            {#if name_preference.gender === "feminine"}
              <td><IconFeminine class="text-pink-300" /></td>
            {:else if name_preference.gender === "masculine"}
              <td><IconMasculine class="text-blue-300" /></td>
            {:else if name_preference.gender === "neutral"}
              <td><IconNeutral class="text-purple-300" /></td>
            {:else}
              <td>?</td>
            {/if}
            {#if name_preference.preference === "like"}
              <td><IconLike class="text-red-300" /></td>
            {:else if name_preference.preference === "dislike"}
              <td><IconDislike class="text-red-300" /></td>
            {:else if name_preference.preference === "super"}
              <td><IconSuperLike class="text-indigo-300" /></td>
            {:else}
              <td>?</td>
            {/if}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
