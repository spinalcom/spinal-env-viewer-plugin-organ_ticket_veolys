/*
 * Copyright 2019 SpinalCom - www.spinalcom.com
 *
 *  This file is part of SpinalCore.
 *
 *  Please read all of the following terms and conditions
 *  of the Free Software license Agreement ("Agreement")
 *  carefully.
 *
 *  This Agreement is a legally binding contract between
 *  the Licensee (as defined below) and SpinalCom that
 *  sets forth the terms and conditions that govern your
 *  use of the Program. By installing and/or using the
 *  Program, you agree to abide by all the terms and
 *  conditions stated or referenced herein.
 *
 *  If you do not agree to abide by these terms and
 *  conditions, do not demonstrate your acceptance and do
 *  not install or use the Program.
 *  You should have received a copy of the license along
 *  with this file. If not, see
 *  <http://resources.spinalcom.com/licenses.pdf>.
 */

import { SpinalContextApp } from 'spinal-env-viewer-context-menu-service';
const {
  spinalPanelManagerService,
  // eslint-disable-next-line no-undef
} = require('spinal-env-viewer-panel-manager-service');
import { SERVICE_TYPE as TICKET_CONTEXT_TYPE } from 'spinal-service-ticket/dist/Constants';

const LABEL = 'Link And Manage Veolys Connector';
export class LinkAndManageContextTicketMissionBtn extends SpinalContextApp {
  constructor() {
    super(LABEL, LABEL, {
      icon: 'settings_ethernet',
      icon_type: 'in',
      backgroundColor: '#000000',
      fontColor: '#ffffff',
    });

    this.action = this.openPanel.bind(this);
  }

  isShown(option) {
    if (
      option.selectedNode === option.context &&
      option.selectedNode.type.get() === TICKET_CONTEXT_TYPE
    ) {
      return Promise.resolve(true);
    }
    return Promise.resolve(-1);
  }

  openPanel(option) {
    spinalPanelManagerService.openPanel(
      'LinkAndManageContextTicketMission',
      option.selectedNode.id.get()
    );
  }
}
