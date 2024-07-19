<script lang="ts">
	import { createEventDispatcher, onMount } from "svelte";

	const dispatch = createEventDispatcher();
	export let open = true;
	// by default Drawer opens from right. Make left-0 for left opening
	export let placement = "right-0";
	// max size of content section
	export let maxScreenSize = "max-w-lg";

	const blur = () => {
		dispatch("blur");
		open = !open;
	};

	let mounted = false;

	onMount(() => {
		scrollLock(open);
	});

	const scrollLock = (open: boolean) => {
		if (mounted) {
			const body = document.querySelector("body");
			document.querySelector("body").style.overflow = open ? "hidden" : "auto";
		}
	};

	$: scrollLock(open);
</script>

<div class="bg-red-500 w-full h-full border-2 border-red-400">asd</div>
<div class="fixed inset-0 w-full h-full z-50 overflow-hidden {open ? 'visible' : 'invisible'}">
	<div class="w-screen h-full bg-gray-500 cursor-pointer duration-500 transition-opacity overflow-hidden {open ? 'opacity-50' : 'opacity-0'}" on:click={blur} />
	<div class="absolute {placement} top-0 shadow-xl overflow-y-auto bg-white transition-all duration-300 h-full {maxScreenSize} {open ? 'w-screen' : 'w-0'}">
		<slot />
	</div>
</div>
