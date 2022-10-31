<!--
Copyright 2021 SpinalCom - www.spinalcom.com

This file is part of SpinalCore.

Please read all of the following terms and conditions
of the Free Software license Agreement ("Agreement")
carefully.

This Agreement is a legally binding contract between
the Licensee (as defined below) and SpinalCom that
sets forth the terms and conditions that govern your
use of the Program. By installing and/or using the
Program, you agree to abide by all the terms and
conditions stated or referenced herein.

If you do not agree to abide by these terms and
conditions, do not demonstrate your acceptance and do
not install or use the Program.
You should have received a copy of the license along
with this file. If not, see
<http://resources.spinalcom.com/licenses.pdf>.
-->

<template>
  <v-card class="spinal-setup-equip-body">
    <set-up-toolbar
      :title="'Setup Context\'s equipment to send'"
      @back="back"
      @save="save"
    />
    <v-card-text class="spinal-setup-equip-container">
      <form action="none">
        <md-field>
          <label for="Select Equipment Context(s)"
            >Select Equipment Context(s) to send</label
          >
          <md-select
            v-model="contexts"
            name="Equipment Context Select"
            md-dense
            multiple
          >
            <md-option
              v-for="equipContext in equipContexts"
              :key="equipContext.id"
              :value="equipContext.id"
            >
              {{ equipContext.name }}
            </md-option>
          </md-select>
        </md-field>
      </form>
    </v-card-text>
  </v-card>
</template>

<script>
import { SpinalGraphService } from "spinal-env-viewer-graph-service";
import { FileSystem } from "spinal-core-connectorjs_type";
import SetUpToolbar from "./SetUpToolbar.vue";
export default {
  name: "SetUpContextEquip",
  components: { SetUpToolbar },
  props: {
    serverId: { required: true, type: Number },
  },
  data: function () {
    return {
      equipContexts: [],
      contexts: [],
    };
  },
  async mounted() {
    const cfg = this.getConfig();
    const graph = SpinalGraphService.getGraph();
    const contexts = await graph.getChildren();
    this.equipContexts = contexts.reduce((acc, context) => {
      if (context.info.type.get() === "BIMObjectGroupContext") {
        acc.push({
          id: context.info.id.get(),
          name: context.info.name.get(),
        });
      }
      return acc;
    }, []);
    this.contexts = [];
    if (!cfg.mission.contextsEquip) cfg.mission.add_attr("contextsEquip", []);
    for (let idx = 0; idx < cfg.mission.contextsEquip.length; idx++) {
      this.contexts.push(cfg.mission.contextsEquip[idx].get());
    }
  },
  methods: {
    back() {
      this.$emit("close");
    },
    async save() {
      const cfg = this.getConfig();
      if (!cfg.mission.contextsEquip) cfg.mission.add_attr("contextsEquip", []);
      cfg.mission.contextsEquip.set(this.contexts);
      cfg.mission.organStatus.set(4);
      this.$emit("close");
    },
    getConfig() {
      return FileSystem._objects[this.serverId];
    },
  },
};
</script>

<style scoped>
.spinal-setup-equip-body {
  height: 100%;
  position: relative;
  overflow: hidden;
}

.spinal-setup-equip-container {
  height: calc(100% - 50px);
  position: relative;
  overflow: auto;
}
</style>
