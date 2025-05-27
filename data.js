import { MaterialCommunityIcons, FontAwesome5, Entypo, Ionicons, Feather } from '@expo/vector-icons';

export const SliderOPtions = [
  {
    id: 1,
    title: 'Latest',
    Icon: (props) => <Ionicons name="globe-outline" {...props} />,
  },
  {
    id: 2,
    title: 'Hotels',
    Icon: (props) => <Ionicons name="bed-outline" {...props} />,
  },
  {
    id: 3,
    title: 'Resorts',
    Icon: (props) => <MaterialCommunityIcons name="beach" {...props} />,
  },
  {
    id: 4,
    title: 'Villas',
    Icon: (props) => <MaterialCommunityIcons name="home-city-outline" {...props} />,
  },
  {
    id: 5,
    title: 'Islands',
    Icon: (props) => <MaterialCommunityIcons name="island" {...props} />,
  },
  {
    id: 6,
    title: 'Farms',
    Icon: (props) => <MaterialCommunityIcons name="home-flood" {...props} />,
  },
  {
    id: 7,
    title: 'Hubs',
    Icon: (props) => <MaterialCommunityIcons name="office-building" {...props} />,
  },
];
