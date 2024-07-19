<script lang="ts">
	import { createEventDispatcher, onDestroy, onMount } from "svelte";
	import { slide } from "svelte/transition";
	import type { DrawerInstance } from "./drawer-instance";

	export let instance: DrawerInstance<any>;
	let visible = false;
	interface $$Events {
		close: CustomEvent<string>;
		externalClickEvent: (e: PointerEvent) => void;
	}

	const settings: Record<string, { axis: "y" | "x"; classes: string; reverse?: boolean }> = {
		top: {
			axis: "y",
			classes: "top-0 w-full",
			reverse: true
		},
		bottom: {
			axis: "y",
			classes: "bottom-0 w-full"
		},
		left: {
			axis: "x",
			classes: "left-0 bottom-0 h-full"
		},
		right: {
			axis: "x",
			classes: "right-0 bottom-0 h-full"
		}
	};

	onMount(() => {
		instance.element = ref;
		visible = true;
	});

	onDestroy(() => {
		dispatch("close");
		document.removeEventListener("click", handleClick, true);
	});

	let ref: HTMLElement;

	const dispatch = createEventDispatcher<Record<keyof $$Events, any>>();

	const handleClick = (e: MouseEvent) => {
		// @ts-ignore
		if (e.target.contains(ref)) {
			instance.manager.close(instance.config.id);
		}
	};

	document.addEventListener("click", handleClick, true);
</script>

<div bind:this={ref} class="{settings[instance.config.placement].classes} absolute h-full w-full backdrop-blur-sm">
	{#if visible}
		<div on:click={handleClick} on:blur={close} class="absolute {settings[instance.config.placement].classes} bg-blue-500" in:slide={{ duration: 300 }} out:slide={{ duration: 300, axis: settings[instance.config.placement].axis }}>
			<svelte:component this={instance.config.component} {instance} />
		</div>
	{/if}
</div>
