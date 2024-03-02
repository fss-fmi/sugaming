'use client';

import { FaDiscord, FaLink } from 'react-icons/fa6';
import React, { useState } from 'react';
import Link from 'next/link';
import ApiClient from '@sugaming/sugaming-api-client/client';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  ScrollArea,
} from '../../common/client';
import { Card } from '../../common/card/card';
import { Button } from '../../common/server';

interface SponsorsShowcaseProps {
  sponsors: ApiClient.SponsorResponseBodyDto[];
}

export function SponsorsShowcase({ sponsors }: SponsorsShowcaseProps) {
  const [highlightedSponsor, setHighlightedSponsor] = useState<
    { name: string; color: string } | undefined
  >();

  return (
    <Card className="grid grid-flow-col grid-cols-2 grid-rows-5 md:grid-rows-none md:grid-cols-5 w-full mt-2 md:aspect-[5/2] overflow-hidden">
      <div className="flex flex-col justify-center items-center border col-span-2 row-span-2">
        <span className="font-semibold uppercase text-2xl">
          With the support of
        </span>
        <span
          className="text-4xl font-bold uppercase transition-all"
          style={{
            color: highlightedSponsor?.color,
            scale: highlightedSponsor ? 1.3 : 1,
          }}
        >
          {highlightedSponsor?.name || 'our sponsors'}
        </span>
      </div>

      {sponsors.map((sponsor) => (
        <Dialog>
          <DialogTrigger asChild>
            <div
              className="flex flex-col justify-center items-center border cursor-pointer"
              onMouseEnter={() => setHighlightedSponsor(sponsor)}
              onMouseLeave={() => setHighlightedSponsor(undefined)}
            >
              <FaDiscord className="w-24 h-24" />
              <img src={sponsor.image} alt={sponsor.name} />
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>{sponsor.name}</DialogTitle>
            <ScrollArea className="max-h-72">
              <p className="pr-2">{sponsor.description}</p>
            </ScrollArea>
            <Button asChild>
              <Link href={sponsor.link}>
                <FaLink className="mr-2 h-4 w-4" />
                Visit
              </Link>
            </Button>
          </DialogContent>
        </Dialog>
      ))}
    </Card>
  );
}
