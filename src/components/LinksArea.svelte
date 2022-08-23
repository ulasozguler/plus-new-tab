<script>
  import { settings, links } from "@/store"

  export let editAction

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
</script>

<div id="linksArea">
  {#each $links as link}
    <a href={link.link}>
      <div class="card">
        <div class="linkContainer">
          <img src={getFaviconUrl(link.link)} alt={link.name} />
          {$settings.hideText ? "" : link.name}
        </div>
        <div class="actionLinks">
          <div on:click|preventDefault={() => editAction(link)}>
            <img alt="Edit" src="/img/edit.svg" />
          </div>
          <div on:click|preventDefault={() => deleteLink(link.id)}>
            <img alt="Delete" src="/img/delete.svg" />
          </div>
        </div>
      </div>
    </a>
  {/each}
</div>

<style>
  a {
    cursor: pointer;
    text-decoration: none;
    color: var(--text-color);
  }

  .card {
    position: relative;
    text-align: center;
    background: var(--card-bg-color);
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
    padding: 0 1em;
  }

  .linkContainer img {
    margin-right: 0.3em;
    width: var(--icon-size);
    height: var(--icon-size);
  }

  #linksArea a .card {
    opacity: 0.8;
  }

  #linksArea a:hover .card {
    opacity: 1;
  }

  .actionLinks {
    position: absolute;
    bottom: 0.1em;
    right: 0.1em;
    display: none;
  }

  #linksArea a:hover .actionLinks {
    display: flex;
  }

  .actionLinks div {
    opacity: 0.2;
    background-color: #f4f4f3;
    width: 1.2em;
    height: 1.2em;
    margin-left: 0.11em;
  }

  .actionLinks div:hover {
    opacity: 0.9;
    background-color: #e4e4e3;
  }
</style>
