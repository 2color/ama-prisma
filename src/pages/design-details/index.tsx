 
import * as React from 'react';
import { NextSeo } from 'next-seo'
import Page, {
  SectionHeading,
  LargeHeading,
  Subheading,
  ContentContainer,
} from '../../components/Page';
import DesignDetailsGrid from '../../components/DesignDetailsGrid';

export default function DesignDetails() {
  return (
    <Page withHeader>
      <NextSeo
        title={"Brian Lovin · Design Details"}
        description={"A visual exploration of digital products"}
      />
      
      <ContentContainer>
        <SectionHeading>
          <LargeHeading>Design Details</LargeHeading>
          <Subheading style={{ marginTop: '24px' }}>This collection of posts explores some of the best interaction patterns, visual styles, and design decisions of well-known apps. Each detail features a video and my commentary on the functionality and effectiveness of the interface.</Subheading>
        </SectionHeading>
      </ContentContainer>

      <DesignDetailsGrid />
    </Page>
  );
}
