<template>
    <div class="entry-container mb-3 pointer p-2" @click="$router.push({ name: 'entry', params: { id: 10 } })">
        <div class="entry-title d-flex">
            <span class="text-success fs-5 fw-bold">28</span>
            <span class="mx-1 fs-5">Diciembre</span>
            <span class="mx-2 fw-light">2023, jueves</span>
        </div>

        <div class="entry-description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae explicabo quo, perspiciatis, culpa excepturi iste ab mollitia eligendi reprehenderit ut veritatis sed rerum repellendus hic temporibus earum doloremque unde recusandae voluptatibus dolorem repudiandae sint. Rerum quaerat praesentium doloremque, voluptates ex deserunt earum architecto voluptatibus illum harum nihil reprehenderit minus non.
        </div>
    </div>
</template>

<style lang="scss" scoped>
.entry-container {
    border-bottom: 1px solid #2c3e50;
    transition: 0.2 all ease-in;

    &:hover {
        background-color: lighten($color: grey, $amount: 45);
    }

    .entry-description {
        font-size: 12px;
    }
}
</style>