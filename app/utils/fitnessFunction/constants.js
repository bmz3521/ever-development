import Fitness from '@ovalmoney/react-native-fitness';

export const PERMISSIONS = [
  {
    kind: Fitness.PermissionKinds.Steps,
    access: Fitness.PermissionAccesses.Read,
  },
  {
    kind: Fitness.PermissionKinds.HeartRate,
    access: Fitness.PermissionAccesses.Read,
  },
];
