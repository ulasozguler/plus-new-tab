<script>
  import { settings } from "@/store"

  export let newItem

  function openOptionsPage() {
    chrome.runtime.openOptionsPage()
  }
</script>

<div id="actions">
  <div title="Open Settings" on:click={openOptionsPage}>
    <!-- svelte-ignore a11y-missing-attribute -->
    <img src="/img/setting.png" />
  </div>
  <div
    title={$settings.reorderMode ? "Lock Order" : "Unlock Order"}
    on:click={() => {
      $settings.reorderMode = !$settings.reorderMode
    }}
  >
    <!-- svelte-ignore a11y-missing-attribute -->
    <img src="/img/{$settings.reorderMode ? 'open-' : ''}padlock.png" />
  </div>
  <div title="Add" on:click={() => newItem({ id: Date.now() })}>
    <!-- svelte-ignore a11y-missing-attribute -->
    <img src="/img/add.png" />
  </div>
</div>

<style>
  div {
    display: inline;
    cursor: pointer;
    text-decoration: none;
    color: var(--text-color);
    opacity: 0.6;
    margin-left: 0.5em;
  }

  #actions div:hover {
    opacity: 1;
  }

  #actions {
    position: absolute;
    bottom: 1em;
    right: 1.3em;
  }

  img {
    width: 2em;
    height: 2em;
  }
</style>
