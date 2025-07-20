<script lang="ts">
  import Card from "$lib/cardSwiper/Card.svelte"
  // @ts-ignore
  import IconMasculine from "~icons/fa6-solid/mars"
  // @ts-ignore
  import IconFeminine from "~icons/fa6-solid/venus"
  // @ts-ignore
  import IconNeutral from "~icons/fa6-solid/mars-and-venus"
  // @ts-ignore
  import IconLike from "~icons/fa6-solid/heart"
  // @ts-ignore
  import IconDislikeButton from "~icons/fa6-solid/xmark"
  // @ts-ignore
  import IconDislike from "~icons/fa6-regular/heart"
  // @ts-ignore
  import IconSuperLike from "~icons/fa6-solid/star"
  import { enhance } from "$app/forms"
  import { tick } from "svelte"

  const { data } = $props()

  let card: HTMLElement
  let formElement: HTMLFormElement
  let formName = data.name.name
  let formGender = data.name.gender
  let formPreference = $state(data.name_preference?.preference ?? "")
</script>

{#await data}
  <h1>WAITING...</h1>
{:then { }}
  <div class="flex mx-16">
    <div class="flex flex-col pt-2 px-6">
      <h3 class="flex text-3xl font-semibold pt-0.5">{data.name.name}</h3>
      <div class="flex items-center gap-8 pt-3">
        <div class="flex gap-2">
          {#if data.name.gender === "feminine"}
            <IconFeminine class="text-pink-300" /><span
              class="font-extralight italic">feminine</span
            >
          {:else if data.name.gender === "masculine"}
            <IconMasculine class="text-blue-300" /><span
              class="font-extralight italic">masculine</span
            >
          {:else if data.name.gender === "neutral"}
            <IconNeutral class="text-purple-300" /><span
              class="font-extralight italic">neutral</span
            >
          {/if}
        </div>
        <div class="flex gap-2">
          {#if !data.name_preference}
            <IconDislike class="text-red-300" /><span
              class="font-extralight italic">unknown</span
            >
          {:else if data.name_preference.preference === "like"}
            <IconLike class="text-red-300" /><span
              class="font-extralight italic">liked</span
            >
          {:else if data.name_preference.preference === "dislike"}
            <IconDislike class="text-red-300" /><span
              class="font-extralight italic">disliked</span
            >
          {:else if data.name_preference.preference === "super"}
            <IconSuperLike class="text-indigo-300" /><span
              class="font-extralight italic">super liked!</span
            >
          {/if}
        </div>
      </div>
      <p class="pt-4 px-6">
        {data.name.description}
      </p>
      <div class="pt-3 px-4">
        {#each data.name.usages as usage}
          <div class="badge badge-outline m-1">{usage}</div>
        {/each}
      </div>
    </div>
  </div>
  <form
    method="POST"
    action="?/submitNamePreference"
    bind:this={formElement}
    use:enhance
  >
    <div class="flex mx-16 pt-10 pb-3 gap-5 justify-center items-center">
      <input type="hidden" name="name" bind:value={formName} />
      <input type="hidden" name="gender" bind:value={formGender} />
      <input type="hidden" name="preference" bind:value={formPreference} />
      <button
        type="button"
        formaction="?/submitNamePreference"
        class="btn btn-xl shadow-lg btn-circle btn-soft btn-error touch-manipulation"
        onclick={() => {
          formPreference = "dislike"
          tick().then(() => {
            formElement.requestSubmit()
          })
        }}
      >
        <IconDislikeButton />
      </button>
      <button
        type="button"
        class="btn shadow-md mt-2.5 btn-circle btn-soft btn-info touch-manipulation"
        onclick={() => {
          formPreference = "super"
          tick().then(() => {
            formElement.requestSubmit()
          })
        }}
      >
        <IconSuperLike />
      </button>
      <button
        type="button"
        class="btn shadow-lg btn-xl btn-circle btn-soft btn-success touch-manipulation"
        onclick={() => {
          formPreference = "like"
          tick().then(() => {
            formElement.requestSubmit()
          })
        }}
      >
        <IconLike />
      </button>
    </div>
  </form>
{/await}
