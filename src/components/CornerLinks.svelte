<script>
  import { settings } from "@/store"

  export let setFormData

  function openOptionsPage() {
    chrome.runtime.openOptionsPage()
  }

  function toggleLock() {
    $settings.isLocked = !$settings.isLocked
  }
</script>

<div id="actions">
  <div title="Open Settings" on:click={openOptionsPage}>
    <img alt="Settings" src="/img/setting.png" />
  </div>
  <div
    title={$settings.isLocked ? "Unlock Order" : "Lock Order"}
    on:click={toggleLock}
  >
    <img alt="Lock" src="/img/{$settings.isLocked ? '' : 'open-'}padlock.png" />
  </div>
  <div title="Add" on:click={() => setFormData({ id: Date.now() })}>
    <img alt="Add" src="/img/add.png" />
  </div>
</div>

<style>
  #actions {
    display: flex;
    gap: 0.5em;
    position: absolute;
    bottom: 1em;
    right: 1.3em;
  }

  #actions div {
    cursor: pointer;
    opacity: 0.5;
  }

  #actions div:hover {
    opacity: 1;
  }

  img {
    width: 2em;
    height: 2em;
  }
</style>
