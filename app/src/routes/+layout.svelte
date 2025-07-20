<script lang="ts">
  import "../app.css"
  import { navigating } from "$app/stores"
  import { expoOut } from "svelte/easing"
  import { slide } from "svelte/transition"
  import { WebsiteName } from "../config"

  // @ts-ignore
  import IconAccount from "~icons/fa6-solid/circle-user"
  // @ts-ignore
  import IconMenu from "~icons/fa6-solid/bars"

  interface Props {
    children?: import("svelte").Snippet
  }

  let { children }: Props = $props()
</script>

{#if $navigating}
  <!-- 
    Loading animation for next page since svelte doesn't show any indicator. 
     - delay 100ms because most page loads are instant, and we don't want to flash 
     - long 12s duration because we don't actually know how long it will take
     - exponential easing so fast loads (>100ms and <1s) still see enough progress,
       while slow networks see it moving for a full 12 seconds
  -->
  <div
    class="fixed w-full top-0 right-0 left-0 h-1 z-50 bg-primary"
    in:slide={{ delay: 100, duration: 12000, axis: "x", easing: expoOut }}
  ></div>
{/if}
<div class="navbar container mx-auto">
  <div class="navbar-start">
    <a class="btn btn-ghost normal-case text-xl font-bold" href="/"
      >{WebsiteName}<img
        class="h-11 w-11"
        alt="The website logo"
        src="/images/logo.svg"
      />
    </a>
  </div>
  <div class="navbar-end">
    <ul class="menu menu-horizontal px-1 font-bold text-lg">
      <li class="">
        <a href="/account" class="btn btn-ghost btn-lg btn-circle"
          ><IconAccount /></a
        >
      </li>
      <li class="dropdown dropdown-end">
        <!-- svelte-ignore a11y_label_has_associated_control -->
        <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
        <label tabindex="0" class="btn btn-ghost btn-lg btn-circle">
          <IconMenu />
        </label>
        <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
        <ul
          tabindex="0"
          class="menu menu-lg dropdown-content mt-3 z-1 shadow-sm bg-base-100 rounded-box w-52 font-bold"
        >
          <li><a href="/blog">Blog</a></li>
          <li><a href="/contribute">Contribute</a></li>
          <li><a href="/search">Search</a></li>
        </ul>
      </li>
    </ul>
  </div>
</div>

<div class="">
  {@render children?.()}
</div>

<!-- Spacer grows so the footer can be at bottom on short pages -->
<div class="grow"></div>
<div class="">
  <div class="divider max-w-[1000px] mx-auto"></div>
  <footer
    class="footer md:footer-horizontal p-10 gap-x-48 lg:gap-x-64 xl:gap-x-96 place-content-center text-base"
  >
    <nav>
      <span class="footer-title opacity-80">Explore</span>
      <a class="link link-hover mb-1" href="/">Home</a>
      <a class="link link-hover mb-1" href="/account">Account</a>
      <a class="link link-hover my-1" href="/blog">Blog</a>
      <a class="link link-hover my-1" href="/contribute">Contribute</a>
      <a class="link link-hover my-1" href="/contact_us">Contact Us</a>
    </nav>
    <aside>
      <span class="footer-title opacity-80">Sincerely</span>
      <a class="max-w-[260px]" href="/mission">
        <div class="font-bold text-3xl mb-1">{WebsiteName}</div>
        <div class="font-medium mb-3">Find A Name You Love</div>
        <div class="font-light">
          Work together with your friends and family to find the perfect name
          for your baby, pet, or new identity. Swipe and see what everyone
          thinks!
        </div>
        <div class="link text-sm font-bold mt-2">Learn More</div>
      </a>
    </aside>
  </footer>
</div>
