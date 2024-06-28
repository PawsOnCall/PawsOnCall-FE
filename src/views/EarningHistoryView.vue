<template>
  <div class="dashboard">
    <el-row :gutter="20">
      <el-col :span="20">
        <el-row :gutter="20">
          <el-col :span="8">
            <UserCard :isGroomer="true" />
          </el-col>
          <el-col :span="16">
            <div class="new-card-info">
              <h4>Earning history</h4>
              <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
                <el-tab-pane label="Earnings" name="Earnings">Earnings</el-tab-pane>
                <el-tab-pane label="Pending Earnings" name="Pending Earnings"
                  >Pending Earnings</el-tab-pane
                >
                <el-tab-pane label="Withdrawals" name="Withdrawals">Withdrawals</el-tab-pane>
              </el-tabs>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="4">
        <Sidebar :isGroomer="true" />
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import Sidebar from '@/components/Siderbar.vue'
import UserCard from '@/components/UserCard.vue'
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'

const activeName = ref('Earnings')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
</script>

<style scoped>
.dashboard {
  padding: 20px;
  background: #f2f2f2;
}
.new-card-info {
  padding: 20px 20px 20px 50px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  background: #fff;
  margin-bottom: 20px;
}
h4 {
  font-size: 18px;
  margin: 20px auto;
  text-align: center;
}
.des {
  font-size: 13px;
  margin-bottom: 24px;
}
</style>
