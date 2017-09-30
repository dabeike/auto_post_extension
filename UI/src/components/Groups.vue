<template>
    <div>
        <el-checkbox-group v-if="option.type==='checkbox'" v-model="option.ans" class="option-item">
            <template v-for="(item,index) in option.group">
                <el-checkbox :label="item.key" :key="item.key">
                    <a v-if="item.href" :href="item.href" target="_blank">
                        {{item.title}}
                    </a>
                    <span v-else="">{{item.title}}</span>
                </el-checkbox>
                <template v-if="index!=option.group.length-1">
                    <br v-if="option.order==='|'"/>
                    <div v-else class="split">|</div>
                </template>
            </template>
        </el-checkbox-group>
        <el-radio-group v-else-if="option.type==='radio'" v-model="option.ans" class="option-item">
            <template v-for="(item,index) in option.group">
                <el-radio :label="item.key" :key="item.key">
                    <a v-if="item.href" :href="item.href" target="_blank">
                        {{item.title}}
                    </a>
                    <span v-else="">{{item.title}}</span>
                </el-radio>
                <template v-if="index!=option.group.length-1">
                    <br v-if="option.order==='|'"/>
                    <div v-else class="split">|</div>
                </template>
            </template>
        </el-radio-group>
        <div v-else-if="option.type==='input'||option.type==='textarea'" class="option-item">
            {{option.title}}：

            <el-input v-model="option.ans" style="margin-top: 5px"
                      :type="option.type"
                      size="small"
                      placeholder="请输入内容"
                      icon="edit">
            </el-input>

        </div>


        <!--{{option.ans}}-->
    </div>
</template>

<script>
    export default {
        name: 'groups',
        props: ['option'],
        data() {
            return {}
        }
    }
</script>

<style scoped>
    .option-item {
        margin-top: 10px;
    }

    .split {
        width: 10px;
        display: inline-block;
    }
</style>
