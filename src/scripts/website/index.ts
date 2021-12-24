/*
 * @Author       : HCLonely
 * @Date         : 2021-12-24 15:03:56
 * @LastEditTime : 2021-12-24 15:19:20
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/website/index.ts
 * @Description  : 整合website相关
 */

import FreeAnyWhere from './FreeAnyWhere';
import { GiveawaySu } from './GiveawaySu';
import Indiedb from './Indiedb';
import Keyhub from './Keyhub';
import Givekey from './Givekey';
import GiveeClub from './GiveeClub';
import OpiumPulses from './OpiumPulses';
import Keylol from './Keylol';
import Opquests from './Opquests';
import Gleam from './Gleam';
import SweepWidget from './SweepWidget';

type WebsitesType = typeof FreeAnyWhere |
  typeof GiveawaySu |
  typeof Indiedb |
  typeof Keyhub |
  typeof Givekey |
  typeof GiveeClub |
  typeof OpiumPulses |
  typeof Keylol |
  typeof Opquests |
  typeof Gleam |
  typeof SweepWidget

type WebsiteType = FreeAnyWhere |
  GiveawaySu |
  Indiedb |
  Keyhub |
  Givekey |
  GiveeClub |
  OpiumPulses |
  Keylol |
  Opquests |
  Gleam |
  SweepWidget

const Websites: Array<WebsitesType> = [
  FreeAnyWhere, GiveawaySu, Indiedb, Keyhub, Givekey, GiveeClub, OpiumPulses, Keylol, Opquests, Gleam, SweepWidget
];

export { Websites, WebsiteType };
