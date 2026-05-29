import PlatformsClient from './PlatformsClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Social Platforms | AutoContent AI',
  description: 'Connect and manage your social media accounts',
};

export default function PlatformsPage() {
  return <PlatformsClient />;
}
