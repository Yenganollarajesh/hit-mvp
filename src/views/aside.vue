<template>
    <div class="main-wrapper">
        <div class="aside-view-wrapper">
            <div class="user-name-wrapper">
                user name
            </div>
            <div class="aside-view-items">

            </div>

        </div>
        <div class="section-view-wrapper">
            <DiscoverUserRoles/>
             <!-- <DiscoverFeaturesVue/> -->
        </div>
    </div>
</template>

<script setup>
import DiscoverFeaturesVue from './DiscoverFeatures.vue';
import DiscoverUserRoles from './DiscoverUserRoles.vue';
</script>

<style lang="scss" scoped>
.main-wrapper{
    display: grid;
    grid-template-columns: 25% 75%;
    height: 100%;
    // overflow: auto;
}

.aside-view-wrapper{
    background: #f2eee1;
    height: 100%;
    padding: 0px 12px;
    .user-name-wrapper{
        text-align: center;
    }
    .aside-view-items{

    }
}

.section-view-wrapper {
    height: 100%;
    overflow: auto;

    /* WebKit Browsers (Chrome, Edge, Safari) */
    &::-webkit-scrollbar {
        width: 4px; /* Scrollbar width */
    }

    &::-webkit-scrollbar-track {
        background: #f1f1f1; /* Track color */
        // border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb {
        background: #888; /* Scroll thumb color */
        // border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb:hover {
        background: #555; /* Darker color on hover */
    }
}
</style>
