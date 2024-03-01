'use client';

import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { avataaars } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { Button } from '../../../common/server';
import { DialogFooter, ScrollArea } from '../../../common/client';

const options = {
  mouth: [
    'default',
    'smile',
    'sad',
    'serious',
    'screamOpen',
    'tongue',
    'eating',
  ],
  top: [
    'dreads01',
    'curvy',
    'frizzle',
    'shaggy',
    'bun',
    'frida',
    'turban',
    'hijab',
    'bigHair',
    'bob',
    'straight01',
    'straight02',
    'winterHat04',
    'theCaesarAndSidePart',
  ],
  accessories: [
    'none',
    'eyepatch',
    'kurt',
    'prescription01',
    'prescription02',
    'round',
    'sunglasses',
    'wayfarers',
  ],
  hairColor: [
    'f59797',
    'ecdcbf',
    'e8e1e1',
    'd6b370',
    'c93305',
    'b58143',
    'a55728',
    '724133',
    '4a312c',
    '2c1b18',
  ],
  accessoryColor: ['black', 'blue', 'gray', 'green'],
  eyes: [
    'default',
    'closed',
    'cry',
    'eyeRoll',
    'happy',
    'hearts',
    'side',
    'squint',
    'surprised',
    'wink',
    'winkWacky',
    'xDizzy',
  ],
  eyebrows: [
    'angry',
    'angryNatural',
    'default',
    'defaultNatural',
    'flatNatural',
    'frownNatural',
    'raisedExcited',
    'raisedExcitedNatural',
    'sadConcerned',
    'sadConcernedNatural',
    'unibrowNatural',
    'upDown',
    'upDownNatural',
  ],
  facialHair: [
    'none',
    'beardLight',
    'beardMajestic',
    'beardMedium',
    'moustacheFancy',
    'moustacheMagnum',
  ],
  skinColor: [
    'edb98a',
    '614335',
    'ae5d29',
    'd08b5b',
    'f8d25c',
    'ffdbb4',
    'fd9841',
  ],
  facialHairColor: [
    '2c1b18',
    '4a312c',
    '724133',
    'a55728',
    'b58143',
    'c93305',
    'd6b370',
    'e8e1e1',
    'ecdcbf',
    'f59797',
  ],
  clothesColor: [
    '3c4f5c',
    '65c9ff',
    '262e33',
    '5199e4',
    '25557c',
    '929598',
    'a7ffc4',
    'b1e2ff',
    'e6e6e6',
    'ff5c5c',
    'ff488e',
    'ffafb9',
    'ffffb1',
    'ffffff',
  ],
  clothing: [
    'blazerAndShirt',
    'blazerAndSweater',
    'collarAndSweater',
    'graphicShirt',
    'hoodie',
    'overall',
    'shirtCrewNeck',
    'shirtScoopNeck',
    'shirtVNeck',
  ],
};

interface CustomizationOptions {
  mouth: number;
  top: number;
  accessories: number;
  hairColor: number;
  accessoryColor: number;
  eyes: number;
  eyebrows: number;
  facialHair: number;
  skinColor: number;
  facialHairColor: number;
  clothesColor: number;
  clothing: number;
}

interface AvatarStepProps {
  previousStep: () => void;
  nextStep: (avatar: File) => void;
}

interface CustomizationOptionProps {
  category: keyof CustomizationOptions;
  label: string;
  onPrevious: (category: keyof CustomizationOptions) => void;
  onNext: (category: keyof CustomizationOptions) => void;
}

function CustomizationOption({
  category,
  label,
  onPrevious,
  onNext,
}: CustomizationOptionProps) {
  return (
    <div className="flex items-center justify-between my-1">
      <Button variant="secondary" onClick={() => onPrevious(category)}>
        <FaArrowLeft />
      </Button>

      <span className="mx-4 my-0">{label}</span>
      <Button variant="secondary" onClick={() => onNext(category)}>
        <FaArrowRight />
      </Button>
    </div>
  );
}

function dataURLtoFile(dataURL: string) {
  const arr = dataURL.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  let bstr = '';

  if (arr[0].indexOf('base64') !== -1) {
    // If it's a Base64-encoded data URL
    bstr = atob(arr[1]);
  } else {
    // If it's a URL-encoded data URL
    bstr = decodeURIComponent(arr[1]);
  }

  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  for (; n >= 0; n -= 1) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  const file = new File([u8arr], 'avatar.svg', { type: mime });
  console.log(file);
  return file;
}

export function AvatarStep({ previousStep, nextStep }: AvatarStepProps) {
  const [customization, setCustomization] = useState<CustomizationOptions>({
    mouth: 0,
    top: 0,
    accessories: 0,
    hairColor: 0,
    accessoryColor: 0,
    eyes: 0,
    eyebrows: 0,
    facialHair: 0,
    skinColor: 0,
    facialHairColor: 0,
    clothesColor: 0,
    clothing: 0,
  });

  const handleNextOption = (category: keyof CustomizationOptions) => {
    const currentOptionIndex = customization[category];
    const nextOptionIndex =
      currentOptionIndex === options[category].length - 1
        ? 0
        : currentOptionIndex + 1;
    setCustomization({ ...customization, [category]: nextOptionIndex });
  };

  const handleGoToPreviousOption = (category: keyof CustomizationOptions) => {
    const currentOptionIndex = customization[category];
    const previousOptionIndex =
      currentOptionIndex === 0
        ? options[category].length - 1
        : currentOptionIndex - 1;
    setCustomization({ ...customization, [category]: previousOptionIndex });
  };

  const t = useTranslations('site.onboarding-dialog.avatar-step');
  const avatar = createAvatar(avataaars, {
    seed: Math.random().toString(36).substring(7),
    ...Object.fromEntries(
      Object.entries(customization).map(([key, value]) => [
        key,
        [options[key][value]],
      ]),
    ),
    accessoriesProbability: 100,
    facialHairProbability: 100,
  });

  return (
    <div className="px-12 flex flex-col justify-center">
      <div className="flex justify-center items-center">
        <img src={avatar.toDataUriSync()} alt="" width="150" height="150" />
      </div>
      <div>
        <div className="flex flex-col items-center text-center w-full">
          <h1 className="text-lg font-semibold">{t('title')}</h1>
          <p>{t('description')}</p>
        </div>
        <ScrollArea className="h-72 px-2 mt-2 text-center">
          <div className="flex flex-col sm:flex-row justify-between">
            <div className="flex flex-col">
              <CustomizationOption
                category="skinColor"
                label={t('skin-tone')}
                onPrevious={handleGoToPreviousOption}
                onNext={handleNextOption}
              />
              <CustomizationOption
                category="eyes"
                label={t('eyes')}
                onPrevious={handleGoToPreviousOption}
                onNext={handleNextOption}
              />
              <CustomizationOption
                category="eyebrows"
                label={t('eyebrows')}
                onPrevious={handleGoToPreviousOption}
                onNext={handleNextOption}
              />
              <CustomizationOption
                category="mouth"
                label={t('mouth')}
                onPrevious={handleGoToPreviousOption}
                onNext={handleNextOption}
              />
              <CustomizationOption
                category="facialHair"
                label={t('facial-hair')}
                onPrevious={handleGoToPreviousOption}
                onNext={handleNextOption}
              />
              <CustomizationOption
                category="facialHairColor"
                label={t('facial-hair-color')}
                onPrevious={handleGoToPreviousOption}
                onNext={handleNextOption}
              />
            </div>

            <div className="flex flex-col">
              <CustomizationOption
                category="top"
                label={t('top')}
                onPrevious={handleGoToPreviousOption}
                onNext={handleNextOption}
              />
              <CustomizationOption
                category="hairColor"
                label={t('hair-color')}
                onPrevious={handleGoToPreviousOption}
                onNext={handleNextOption}
              />
              <CustomizationOption
                category="clothing"
                label={t('clothing')}
                onPrevious={handleGoToPreviousOption}
                onNext={handleNextOption}
              />
              <CustomizationOption
                category="clothesColor"
                label={t('clothes-color')}
                onPrevious={handleGoToPreviousOption}
                onNext={handleNextOption}
              />
              <CustomizationOption
                category="accessories"
                label={t('accessory')}
                onPrevious={handleGoToPreviousOption}
                onNext={handleNextOption}
              />
              <CustomizationOption
                category="accessoryColor"
                label={t('accessory-color')}
                onPrevious={handleGoToPreviousOption}
                onNext={handleNextOption}
              />
            </div>
          </div>
        </ScrollArea>
      </div>

      <DialogFooter className="flex mt-2 gap-y-1 sm:gap-y-0 content-center">
        <Button onClick={previousStep} variant="secondary">
          {t('previous')}
        </Button>
        <Button onClick={() => nextStep(dataURLtoFile(avatar.toDataUriSync()))}>
          {t('continue')}
        </Button>
      </DialogFooter>
    </div>
  );
}
