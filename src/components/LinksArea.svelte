<script>
  import { settings, links } from "@/store"
  import { flip } from "svelte/animate"

  export let setFormData

  function deleteLink(linkId) {
    if (confirm("Are you sure?")) {
      $links = [...$links.filter((x) => x.id !== linkId)]
    }
  }

  function getFaviconUrl(url) {
    return (
      `chrome-extension://${chrome.runtime.id}` +
      `/_favicon/?pageUrl=${encodeURIComponent(url)}&size=64`
    )
  }

  function addProtocol(link) {
    if (link.indexOf("://") === -1) link = "https://" + link
    return link
  }

  // reorder logic
  let hovering

  function moveElement(arr, fromIndex, toIndex) {
    var element = arr[fromIndex]
    arr.splice(fromIndex, 1)
    arr.splice(toIndex, 0, element)
  }

  function drop(event, target) {
    event.dataTransfer.dropEffect = "move"
    const start = parseInt(event.dataTransfer.getData("text/plain"))
    moveElement($links, start, target)
    $links = $links // force update store
    hovering = null
  }

  function dragstart(event, i) {
    event.dataTransfer.effectAllowed = "move"
    event.dataTransfer.dropEffect = "move"
    event.dataTransfer.setData("text/plain", i)
  }
</script>

<div id="linksArea">
  {#each $links as link, index (link.id)}
    <a
      href={addProtocol(link.link)}
      draggable={!$settings.isLocked}
      animate:flip={{ duration: 250 }}
      on:dragstart={(event) => dragstart(event, index)}
      on:drop={(event) => drop(event, index)}
      on:dragover|preventDefault
      on:dragend={() => (hovering = false)}
      on:dragenter={() => (hovering = index)}
    >
      <div class="card">
        <div class="linkContainer" class:isDropArea={hovering === index}>
          <img
            src={getFaviconUrl(link.link)}
            alt={link.name}
            draggable="false"
          />
          {$settings.hideText ? "" : link.name}
        </div>
        <div class="actionLinks">
          <div on:click|preventDefault={() => setFormData(link)}>
            <img alt="Edit" src="/img/edit.svg" draggable="false" />
          </div>
          <div on:click|preventDefault={() => deleteLink(link.id)}>
            <img alt="Delete" src="/img/delete.svg" draggable="false" />
          </div>
        </div>
      </div>
    </a>
  {/each}
</div>

<style>
  a {
    text-decoration: none;
    color: var(--text-color);
  }

  #linksArea {
    font-family: "Roboto", sans-serif;
    font-size: 1.3em;
    background: var(--bg-color);
    height: 100vh;
    width: 100vw;
    overflow-x: hidden;

    display: grid;
    grid-template-columns: repeat(var(--col-num), var(--card-width));

    align-content: flex-start;
    justify-content: center;
    grid-gap: var(--card-margin);

    padding: 15vh 2em 0;
    box-sizing: border-box;
  }

  #linksArea a div.linkContainer {
    height: 6.5em;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
      0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    cursor: var(--cursor-mode);

    padding: 0 1em;
    box-sizing: border-box;
  }

  .isDropArea {
    border: 0.3em solid black;
  }

  .linkContainer img {
    margin-right: 0.3em;
    width: var(--icon-size);
    height: var(--icon-size);
  }

  #linksArea a .card {
    position: relative;
    background: var(--card-bg-color);
    opacity: 0.8;
  }

  #linksArea a:hover .card {
    opacity: 1;
  }

  .actionLinks {
    display: none;
    position: absolute;
    bottom: 0.1em;
    right: 0.1em;
  }

  #linksArea a:hover .actionLinks {
    display: flex;
    gap: 0.11em;
  }

  .actionLinks div {
    opacity: 0.2;
    background-color: #f4f4f3;
    width: 1.2em;
    height: 1.2em;
  }

  .actionLinks div:hover {
    opacity: 0.9;
    background-color: #e4e4e3;
  }
</style>
