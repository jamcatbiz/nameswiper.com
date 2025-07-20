<script lang="ts">
  import { WebsiteName, WebsiteBaseUrl, WebsiteDescription } from "../../config"

  // @ts-ignore
  import { CardSwiper, type CardData } from "$lib/cardSwiper"
  import { nameData, outOfBoundsData } from "./names"
  import { usageDate } from "./usages"
  import { enhance } from "$app/forms"

  // @ts-ignore
  import IconLike from "~icons/fa6-solid/heart"
  // @ts-ignore
  import IconDislike from "~icons/fa6-solid/xmark"
  // @ts-ignore
  import IconSuperLike from "~icons/fa6-solid/star"
  // @ts-ignore
  import IconUndo from "~icons/fa6-solid/rotate-left"
  // @ts-ignore
  import IconSettings from "~icons/fa6-solid/filter"
  // @ts-ignore
  import IconHelp from "~icons/fa6-regular/circle-question"
  // @ts-ignore
  import IconMasculine from "~icons/fa6-solid/mars"
  // @ts-ignore
  import IconFeminine from "~icons/fa6-solid/venus"
  // @ts-ignore
  import IconNeutral from "~icons/fa6-solid/mars-and-venus"
  import { goto } from "$app/navigation"

  let swipe: (direction?: "left" | "right", is_super: boolean) => void

  let nameDataFilters = $state({
    genders: {
      masculine: true,
      feminine: true,
      neutral: true,
    },
    allowed_usages: {
      radioGroup: "all",
      customUsage: "African American",
    },
  })

  let nameDisplaySettings = $derived({
    prefix: "",
    suffix: "",
    cardIndex:
      nameDataFilters.allowed_usages.customUsage ||
      nameDataFilters.genders.feminine ||
      nameDataFilters.genders.masculine ||
      nameDataFilters.genders.neutral
        ? 0
        : 0,
  })

  function shuffleArray(array: Array<any>) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
  }
  shuffleArray(nameData)
  let filteredNameData = $derived.by(() => {
    const results = nameData.filter((name_obj) => {
      const allowedUsagesSet = new Set([
        nameDataFilters.allowed_usages.radioGroup === "custom"
          ? nameDataFilters.allowed_usages.customUsage
          : nameDataFilters.allowed_usages.radioGroup,
      ])
      const currentUsageSet = new Set(
        name_obj.usages?.map((usage) => usage.split(" (")[0]),
      )
      const isGenderAllowed: boolean =
        nameDataFilters.genders[name_obj.gender ?? "neutral"]
      const isUsageAllowed: boolean =
        allowedUsagesSet.has("all") ||
        allowedUsagesSet.intersection(currentUsageSet).size > 0
      return isGenderAllowed && isUsageAllowed
    })
    return results
  })

  // function that returns the data for each card
  let data = $derived((index: number) => {
    if (index < 0 || index >= filteredNameData.length) {
      return outOfBoundsData
    }
    return filteredNameData[index]
  })

  let fallback_data = (index: number) => {
    return outOfBoundsData
  }

  let formElement: HTMLFormElement = $state()
  let formName = $state("Default")
  let formPreference = $state("none")
  let formGender = $state("neutral")

  function handleUndo() {
    if (nameDisplaySettings.cardIndex - 3 >= 0) {
      goto(
        `/names/${filteredNameData[nameDisplaySettings.cardIndex - 3]?.title ?? "James"}`,
      )
    }
  }

  const ldJson = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: WebsiteName,
    url: WebsiteBaseUrl,
  }
  const jsonldScript = `<script type="application/ld+json">${
    JSON.stringify(ldJson) + "<"
  }/script>`
</script>

<svelte:head>
  <title>{WebsiteName}</title>
  <meta name="description" content={WebsiteDescription} />
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html jsonldScript}
</svelte:head>

<div class="hero min-h-[60vh]">
  <div class="hero-content text-center py-1">
    <div class="max-w-xl">
      <div class="flex flex-col w-full h-full">
        <div class="flex items-center">
          <p class="font-light">Swipe right for like, left for pass.</p>
          <p>
            <button
              onclick={() => help_modal.showModal()}
              class="btn btn-ghost text-lg link font-medium">Help?</button
            >
          </p>
        </div>
        <p class="font-light">
          <a href="/account" class="link font-medium">Make an account</a> to save
          your preferences.
        </p>
        <div class="flex flex-col pt-4">
          <div class="stack h-100 w-80">
            <div class="flex">
              {#key nameDataFilters.allowed_usages.customUsage}
                {#key `${nameDataFilters.genders.feminine}-${nameDataFilters.genders.masculine}-${nameDataFilters.genders.neutral}`}
                  <CardSwiper
                    cardData={data}
                    bind:formElement
                    bind:formName
                    bind:formPreference
                    bind:formGender
                    bind:stateful={nameDisplaySettings}
                    bind:swipe
                  />
                {/key}
              {/key}
            </div>
            <div class="flex">
              <CardSwiper
                cardData={fallback_data}
                bind:formElement
                bind:formName
                bind:formPreference
                bind:formGender
                arrowKeys={false}
              />
            </div>
          </div>
          <a
            class="btn btn-xs btn-link text-base-content text-sm font-light"
            href="/names/{filteredNameData[nameDisplaySettings.cardIndex - 2]
              ?.title ?? 'Default'}">Learn more</a
          >
          <form
            method="POST"
            action="?/submitNamePreference"
            bind:this={formElement}
            use:enhance
          >
            <div class="flex px-2 pt-4 justify-between">
              <input type="hidden" name="name" bind:value={formName} />
              <input type="hidden" name="gender" bind:value={formGender} />
              <input
                type="hidden"
                name="preference"
                bind:value={formPreference}
              />
              <button
                type="button"
                class="btn shadow-md btn-circle btn-soft btn-warning touch-manipulation"
                onclick={() => {
                  handleUndo()
                }}><IconUndo /></button
              >
              <button
                type="button"
                formaction="?/submitNamePreference"
                class="btn btn-xl shadow-lg btn-circle btn-soft btn-error touch-manipulation"
                onclick={() => {
                  formName =
                    filteredNameData[nameDisplaySettings.cardIndex - 2]
                      ?.title ?? "Default"
                  formGender =
                    filteredNameData[nameDisplaySettings.cardIndex - 2]
                      ?.gender ?? "neutral"
                  formPreference = "dislike"
                  swipe("left", false)
                }}
              >
                <IconDislike />
              </button>
              <button
                type="button"
                class="btn shadow-md mt-2.5 btn-circle btn-soft btn-info touch-manipulation"
                onclick={() => {
                  formName =
                    filteredNameData[nameDisplaySettings.cardIndex - 2]
                      ?.title ?? "Default"
                  formGender =
                    filteredNameData[nameDisplaySettings.cardIndex - 2]
                      ?.gender ?? "neutral"
                  formPreference = "super"
                  swipe("right", true)
                }}
              >
                <IconSuperLike />
              </button>
              <button
                type="button"
                class="btn shadow-lg btn-xl btn-circle btn-soft btn-success touch-manipulation"
                onclick={() => {
                  formName =
                    filteredNameData[nameDisplaySettings.cardIndex - 2]
                      ?.title ?? "Default"
                  formGender =
                    filteredNameData[nameDisplaySettings.cardIndex - 2]
                      ?.gender ?? "neutral"
                  formPreference = "like"
                  swipe("right", false)
                }}
              >
                <IconLike />
              </button>
              <button
                type="button"
                class="btn shadow-md btn-circle btn-soft btn-neutral touch-manipulation"
                onclick={() => settings_modal.showModal()}
                ><IconSettings /></button
              >
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>

<dialog id="help_modal" class="modal modal-bottom sm:modal-middle">
  <div class="modal-box">
    <h3 class="text-lg font-bold text-center">Need Help?</h3>
    <p class="pt-2">
      The goal is to find names that you like, compare with others, learn along
      the way, and have some fun!
    </p>
    <div class="divider"></div>
    <div class="flex items-center">
      <p class="pr-3">If you like a name, swipe right or tap</p>
      <div
        class="btn shadow-lg btn-circle btn-soft btn-success touch-manipulation"
      >
        <IconLike />
      </div>
    </div>
    <div class="flex items-center">
      <p class="pr-3">If not, swipe right or tap</p>
      <div
        class="btn shadow-lg btn-circle btn-soft btn-error touch-manipulation"
      >
        <IconDislike />
      </div>
    </div>
    <div class="flex items-center">
      <p class="pr-3">If you make a mistake, undo with</p>
      <div
        class="btn shadow-lg btn-circle btn-soft btn-warning touch-manipulation"
      >
        <IconUndo />
      </div>
    </div>
    <div class="flex items-center">
      <p class="pr-3">If you really like a name, show it with</p>
      <div
        class="btn shadow-lg btn-circle btn-soft btn-info touch-manipulation"
      >
        <IconSuperLike />
      </div>
    </div>
    <div class="flex items-center">
      <p class="pr-3">Add last names or filter the name list with</p>
      <div
        class="btn shadow-lg btn-circle btn-soft btn-neutral touch-manipulation"
      >
        <IconSettings />
      </div>
    </div>
    <div class="divider"></div>
    <p class="font-light">
      <a href="/account" class="link font-medium">Make an account</a> to save and
      share your preferences.
    </p>
    <p class="font-light pt-2">
      Then you can <a href="/account" class="link font-medium"
        >see and edit your likes</a
      > later.
    </p>

    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn">Close</button>
      </form>
    </div>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>

<dialog id="settings_modal" class="modal modal-bottom sm:modal-middle">
  <div class="modal-box">
    <h3 class="text-lg font-bold text-center">Settings</h3>
    <fieldset
      class="fieldset bg-base-200 border-base-300 rounded-box border p-4"
    >
      <legend class="fieldset-legend">Name Display</legend>

      <label class="label" for="prefix-input">Prefix</label>
      <input
        id="prefix-input"
        type="text"
        class="input"
        placeholder="Ms."
        bind:value={nameDisplaySettings.prefix}
      />

      <label class="label" for="suffix-input">Suffix</label>
      <input
        id="suffix-input"
        type="text"
        class="input"
        placeholder="Jones"
        bind:value={nameDisplaySettings.suffix}
      />
    </fieldset>
    <div class="flex justify-around gap-2">
      <fieldset
        class="fieldset bg-base-200 border-base-300 rounded-box border p-4"
      >
        <legend class="fieldset-legend">Gender</legend>

        <label class="label" for="feminine-input"
          >Feminine<IconFeminine class="text-pink-300" /></label
        >
        <input
          id="feminine-input"
          type="checkbox"
          bind:checked={nameDataFilters.genders.feminine}
          class="toggle"
        />

        <label class="label" for="masculine-input"
          >Masculine<IconMasculine class="text-blue-300" /></label
        >
        <input
          id="masculine-input"
          type="checkbox"
          bind:checked={nameDataFilters.genders.masculine}
          class="toggle"
        />

        <label class="label" for="neutral-input"
          >Neutral<IconNeutral class="text-purple-300" /></label
        >
        <input
          id="neutral-input"
          type="checkbox"
          bind:checked={nameDataFilters.genders.neutral}
          class="toggle"
        />
      </fieldset>
      <fieldset
        class="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4"
      >
        <legend class="fieldset-legend">Usage</legend>

        <div class="join w-full justify-center">
          <input
            class="join-item btn w-9"
            type="radio"
            name="usages"
            bind:group={nameDataFilters.allowed_usages.radioGroup}
            value={"all"}
            aria-label="All"
          />
          <input
            class="join-item btn w-18"
            type="radio"
            name="usages"
            bind:group={nameDataFilters.allowed_usages.radioGroup}
            value={"English"}
            aria-label="English"
          />
          <input
            class="join-item btn w-18"
            type="radio"
            name="usages"
            bind:group={nameDataFilters.allowed_usages.radioGroup}
            value={"custom"}
            aria-label="Custom"
          />
        </div>

        <div class="pt-2">
          {#if nameDataFilters.allowed_usages.radioGroup === "custom"}
            <select
              class="select"
              bind:value={nameDataFilters.allowed_usages.customUsage}
            >
              <option disabled selected>Choose custom usage</option>
              {#each usageDate.sort() as usage}
                <option>{usage}</option>
              {/each}
            </select>
          {:else}
            <select class="select" disabled>
              <option>Choose custom usage</option>
            </select>
          {/if}
        </div>
      </fieldset>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn">Close</button>
      </form>
    </div>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
