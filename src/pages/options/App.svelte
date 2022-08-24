<script>
  import { themes } from "@/static.js"
  import { settings } from "@/store"
  import { onMount } from "svelte"

  let previewIframe

  onMount(() => {
    settings.subscribe(() => {
      if (previewIframe === undefined) return
      previewIframe.contentWindow.location.reload()
    })
  })
</script>

<div id="main">
  <div class="optionCol">
    <label for="theme">Theme:</label>
    <select id="theme" bind:value={$settings.theme}>
      {#each Object.keys(themes) as theme}
        <option value={theme}>{theme}</option>
      {/each}
    </select>
    <div class="clear" />

    <label for="darkColors">Dark Colors:</label>
    <input
      type="checkbox"
      id="darkColors"
      bind:checked={$settings.darkColors}
    />
    <div class="clear" />
  </div>

  <div class="optionCol">
    <label for="cardWidth">Card Width:</label>
    <input
      type="number"
      id="cardWidth"
      class="numberField"
      bind:value={$settings.cardWidth}
    />
    <div class="clear" />

    <label for="cardMargin">Card Margin:</label>
    <input
      type="number"
      step="0.1"
      id="cardMargin"
      class="numberField"
      bind:value={$settings.cardMargin}
    />
    <div class="clear" />
  </div>

  <div class="optionCol">
    <label for="fitWidth">Fit Width:</label>
    <input type="checkbox" id="fitWidth" bind:checked={$settings.fitWidth} />
    <div class="clear" />

    <label for="colCount">Columns:</label>
    <input
      type="number"
      id="colCount"
      class="numberField"
      bind:value={$settings.colCount}
      disabled={$settings.fitWidth}
    />
    <div class="clear" />
  </div>

  <div class="optionCol">
    <label for="iconSize">Icon Size:</label>
    <input
      type="number"
      id="iconSize"
      class="numberField"
      step="0.1"
      bind:value={$settings.iconSize}
    />
    <div class="clear" />

    <label for="hideText">Hide Text:</label>
    <input type="checkbox" id="hideText" bind:checked={$settings.hideText} />
    <div class="clear" />
  </div>

  <iframe
    scrolling="no"
    id="preview"
    title="Preview"
    src="/newtab/index.html"
    bind:this={previewIframe}
  />
</div>

<style>
  * {
    font-family: "Roboto", sans-serif;
    font-size: 16px;
    color: black;
  }

  #main {
    width: 50em;
    padding: 1em;
  }

  #preview {
    width: 100%;
    height: 25em;
    border: 0;
  }

  .clear {
    clear: both;
    height: 0.5em;
  }

  .numberField {
    width: 3em;
  }

  label {
    width: 6em;
    height: 2em;
    display: inline-block;
    text-align: right;
    padding-right: 0.1em;
  }

  .optionCol {
    float: left;
    width: 25%;
  }

  #theme {
    width: 5em;
  }
</style>
