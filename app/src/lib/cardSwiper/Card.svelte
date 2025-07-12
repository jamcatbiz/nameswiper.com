<script lang="ts">
  export let element: HTMLElement

  export let title: string = ""
  export let description: string = ""
  export let gender: string = ""
  export let usages: Array<string> = []
  export let stateful = {
    prefix: "",
    suffix: "",
  }

  // @ts-ignore
  import IconMasculine from "~icons/fa6-solid/mars"
  // @ts-ignore
  import IconFeminine from "~icons/fa6-solid/venus"
  // @ts-ignore
  import IconNeutral from "~icons/fa6-solid/mars-and-venus"

  const maxDescLength = 100
  const maxUsages = 8
</script>

<div
  class="bg-yellow-200 shadow-lg w-full h-full absolute cursor-grab ease-in-out rounded-xl touch-none select-none"
  bind:this={element}
>
  <div
    class="absolute inset-0 bg-gradient-to-t from-white/100 from-35% via-white/10 via-55% rounded-b-lg"
  ></div>
  <div class="flex p-4 w-full justify-left text-left">
    <div class="flex pt-2 items-left flex-col">
      {#if stateful.prefix}
        <p class="flex px-6 text-xl font-semibold opacity-40">
          {stateful.prefix}
        </p>
      {:else}
        <p class="flex px-6 text-xl font-semibold opacity-0">:)</p>
      {/if}
      <div class="flex px-6 gap-2 items-center">
        <h3 class="flex text-3xl font-semibold pt-0.5">{title}</h3>
        {#if gender === "feminine"}
          <div class="text-pink-300"><IconFeminine /></div>
        {:else if gender === "masculine"}
          <div class="text-blue-300"><IconMasculine /></div>
        {:else if gender === "neutral"}
          <div class="text-purple-300"><IconNeutral /></div>
        {/if}
      </div>
      {#if stateful.suffix}
        <p class="flex px-6 text-xl font-semibold opacity-40">
          {stateful.suffix}
        </p>
      {:else}
        <p class="flex px-6 text-xl font-semibold opacity-0">:)</p>
      {/if}
      <p class="pt-4 px-6">
        {description.substring(0, maxDescLength)}{description.length >
        maxDescLength
          ? "..."
          : ""}
      </p>
      <div class="absolute bottom-8 pt-3 px-4">
        {#each usages.slice(0, maxUsages + 1) as usage}
          <div class="badge badge-ghost m-0.25">{usage}</div>
        {/each}
        {#if usages.length > maxUsages}
          <div class="badge badge-ghost">more...</div>
        {/if}
      </div>
    </div>
  </div>
</div>
