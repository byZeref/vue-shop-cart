<template>
    <Menu as="div" class="relative inline-block text-left">
        <div>
            <MenuButton
                class="inline-flex w-full justify-center rounded-md btn-cyan px-4 py-2 text-sm font-medium text-white hover:bg-opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                Options
                <ChevronDownIcon class="ml-2 -mr-1 h-5 w-5 text-white hover:text-violet-600" aria-hidden="true" />
            </MenuButton>
        </div>

        <transition enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in" leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0">
            <!-- el absolute hace q quede en el fondo el menu -->
            <MenuItems
                class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-300 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div class="px-1 py-1">
                    <MenuItem v-slot="{ active }">
                    <button :class="[
                        active ? 'bg-violet-500 text-white' : 'text-gray-900',
                        'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                    ]">
                        <ArchiveBoxIcon :active="active" class="mr-2 h-5 w-5 text-violet-400" aria-hidden="true" />
                        Edit
                    </button>
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                    <button :class="[
                        active ? 'bg-violet-500 text-white' : 'text-gray-900',
                        'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                    ]">
                        <ArchiveBoxIcon :active="active" class="mr-2 h-5 w-5 text-violet-400" aria-hidden="true" />
                        Duplicate
                    </button>
                    </MenuItem>
                </div>
                <div class="px-1 py-1">
                    <MenuItem v-slot="{ active }">
                    <button :class="[
                        active ? 'bg-violet-500 text-white' : 'text-gray-900',
                        'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                    ]">
                        <ArchiveBoxIcon :active="active" class="mr-2 h-5 w-5 text-violet-400" aria-hidden="true" />
                        Archive
                    </button>
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                    <button :class="[
                        active ? 'bg-violet-500 text-white' : 'text-gray-900',
                        'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                    ]">
                        <ArchiveBoxIcon :active="active" class="mr-2 h-5 w-5 text-violet-400" aria-hidden="true" />
                        Move
                    </button>
                    </MenuItem>
                </div>

                <div class="px-1 py-1">
                    <MenuItem v-slot="{ active }">
                    <button :class="[
                        active ? 'bg-violet-500 text-white' : 'text-gray-900',
                        'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                    ]">
                        <ArchiveBoxIcon :active="active" class="mr-2 h-5 w-5 text-violet-400" aria-hidden="true" />
                        Delete
                    </button>
                    </MenuItem>
                </div>
            </MenuItems>
        </transition>
    </Menu>

</template>

<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import { ArchiveBoxIcon } from '@heroicons/vue/20/solid'

</script>
<style>

</style>
