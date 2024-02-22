<!-- <template>
  <el-form
    ref="ruleFormRef"
    label-width="150px"
    class="demo-ruleForm"
    status-icon
    label-position="left"
    :model="ruleForm"
    :rules="rules"
  >
    <el-form-item
      label="Activity name"
      prop="name"
    >
      <el-input v-model="ruleForm.name" />
    </el-form-item>
    <el-form-item
      label="Activity zone"
      prop="region"
    >
      <el-select
        v-model="ruleForm.region"
        placeholder="Activity zone"
      >
        <el-option
          label="Zone one"
          value="shanghai"
        />
        <el-option
          label="Zone two"
          value="beijing"
        />
      </el-select>
    </el-form-item>
    <el-form-item
      label="Activity count"
      prop="count"
    >
      <el-select-v2
        v-model="ruleForm.count"
        placeholder="Activity count"
        :options="options"
      />
    </el-form-item>
    <el-form-item
      label="Activity time"
      required
    >
      <el-col :span="11">
        <el-form-item prop="date1">
          <el-date-picker
            v-model="ruleForm.date1"
            type="date"
            label="Pick a date"
            placeholder="Pick a date"
            style="width: 100%"
          />
        </el-form-item>
      </el-col>
      <el-col
        class="text-center"
        :span="2"
      >
        <span class="text-gray-500">-</span>
      </el-col>
      <el-col :span="11">
        <el-form-item prop="date2">
          <el-time-picker
            v-model="ruleForm.date2"
            label="Pick a time"
            placeholder="Pick a time"
            style="width: 100%"
          />
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item
      label="Instant delivery"
      prop="delivery"
    >
      <el-switch v-model="ruleForm.delivery" />
    </el-form-item>
    <el-form-item
      label="Activity type"
      prop="type"
    >
      <el-checkbox-group v-model="ruleForm.type">
        <el-checkbox
          label="Online activities"
          name="type"
        />
        <el-checkbox
          label="Promotion activities"
          name="type"
        />
        <el-checkbox
          label="Offline activities"
          name="type"
        />
        <el-checkbox
          label="Simple brand exposure"
          name="type"
        />
      </el-checkbox-group>
    </el-form-item>
    <el-form-item
      label="Resources"
      prop="resource"
    >
      <el-radio-group v-model="ruleForm.resource">
        <el-radio label="Sponsorship" />
        <el-radio label="Venue" />
      </el-radio-group>
    </el-form-item>
    <el-form-item
      label="Activity form"
      prop="desc"
    >
      <el-input
        v-model="ruleForm.desc"
        type="textarea"
      />
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        @click="submitForm(ruleFormRef)"
      >
        Create
      </el-button>
      <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup></script> -->
