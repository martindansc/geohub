import { ObjectId } from 'mongodb'

import { GameSettingsType, LocationType } from './'

type Challenge = {
  id: ObjectId | string;
  mapId: string;
  gameSettings: GameSettingsType;
  locations: LocationType[];
  creatorId: ObjectId | string;
  creatorName: string;
  creatorAvatar: string;
};

export default Challenge;