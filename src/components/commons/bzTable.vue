<template>
    <div id="bzTable">
        <div class="bztable-head">
            <span>aaaa</span>
            <slot name="bztable-head"></slot>
        </div>
        <div class="bztable-content">
            <slot name="bztable-content"></slot>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
    #bztable{
        width: 100%;
        background: lightgreen;
        .bztable-head{
            width: 100%;
        }
        .bztable-content{
            width: 100%;
        }
    }
</style>
