<script>
  import { links } from "@/store"

  export let data

  function saveData() {
    const index = $links.findIndex((x) => x.id == data.id)
    if (index === -1) {
      $links.push(data)
      $links = $links
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
      <input
        type="text"
        id="name"
        placeholder="Name"
        bind:value={data.name}
        autofocus
      />
      <input type="text" id="link" placeholder="Link" bind:value={data.link} />
      <input type="hidden" id="id" bind:value={data.id} />
      <input type="submit" value="OK" />
    </form>
  </div>
{/if}

<style>
  #action {
    border: 1px dotted black;
    padding: 10px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    background-color: #e4e4e3;
  }

  #actionForm {
    margin: 0;
  }
</style>
