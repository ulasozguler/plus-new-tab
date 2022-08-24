<script>
  import { themes } from "@/static"
  import { settings } from "@/store"

  import CornerLinks from "@/components/CornerLinks.svelte"
  import LinksArea from "@/components/LinksArea.svelte"
  import LinkForm from "@/components/LinkForm.svelte"

  $: theme = themes[$settings.theme]
  $: isDark = $settings.darkColors

  let formData = {}
  function setFormData(data) {
    formData = data
  }
</script>

<div
  style="
--text-color: {theme[isDark ? '300' : '600']};
--hover-text-color: {theme[isDark ? '100' : '800']};
--bg-color: {theme[isDark ? '800' : '100']};
--card-bg-color: {theme[isDark ? '700' : '300']};
--card-margin: {$settings.cardMargin}em;
--card-width: {$settings.cardWidth}em;
--col-num: {$settings.fitWidth ? 'auto-fit' : $settings.colCount};
--icon-size: {$settings.iconSize}em;
--cursor-mode: {$settings.isLocked ? 'pointer' : 'move'};
"
>
  <LinksArea {setFormData} />
  <CornerLinks {setFormData} />
  <LinkForm data={formData} />
</div>
