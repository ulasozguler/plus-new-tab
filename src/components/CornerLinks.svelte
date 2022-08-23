<script>
  export let newItem

  function openOptionsPage() {
    chrome.runtime.openOptionsPage()
  }
</script>

<div id="actions">
  <a id="settings" on:click={openOptionsPage}>⚙</a>
  <a id="addLink" on:click={() => newItem({ id: Date.now() })}>+</a>
</div>

<style>
  a {
    cursor: pointer;
    text-decoration: none;
    color: var(--text-color);
    opacity: 0.6;
    font-size: 2em;
  }

  #actions a:hover {
    opacity: 1;
  }

  #actions {
    position: absolute;
    bottom: 1.3em;
    right: 1.5em;
  }

  a#addLink {
    border: 0.01em solid;
    border-radius: 1em;
    padding: 0 0.3em 0.05em;
  }

  a#settings {
    margin-right: 0.2em;
  }
</style>
