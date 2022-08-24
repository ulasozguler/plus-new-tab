<script>
  import { links } from "@/store"

  export let data

  function saveData() {
    if (data.name === undefined) data.name = ""

    const index = $links.findIndex((x) => x.id == data.id)
    if (index === -1) {
      $links = [...$links, data]
    } else {
      $links[index] = data
    }

    data = {}
  }

  $: isEmpty = Object.keys(data).length === 0
</script>

{#if !isEmpty}
  <div id="action">
    <form id="actionForm" on:submit|preventDefault={saveData}>
      <!-- svelte-ignore a11y-autofocus -->
      <input type="text" placeholder="Name" bind:value={data.name} autofocus />
      <input type="text" placeholder="Link" bind:value={data.link} />
      <input type="hidden" bind:value={data.id} />
      <input
        type="submit"
        value="OK"
        disabled={data.link === undefined || data.link === ""}
      />
    </form>
  </div>
{/if}

<style>
  #action {
    position: absolute;
    bottom: 1em;
    left: 1em;
    padding: 0.35em;
    background-color: #e4e4e3;
    border: 0.1em dotted black;
  }
</style>
