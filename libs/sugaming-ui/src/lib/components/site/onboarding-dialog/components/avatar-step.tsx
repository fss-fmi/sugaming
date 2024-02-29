'use client';

import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { avataaars } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { Button } from '../../../common/server';
import { DialogFooter } from '../../../common/client';

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
    'fd9841',
    'ffdbb4',
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
  nextStep: () => void;
}

// eslint-disable-next-line react/prop-types
function CustomizationOption({ category, label, onPrevious, onNext }) {
  return (
    <div>
      <div
        className="options"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Button variant="secondary" onClick={() => onPrevious(category)}>
          <FaArrowLeft />
        </Button>
        <h3 style={{ margin: '0 10px' }}>{label}</h3>
        <Button onClick={() => onNext(category)}>
          <FaArrowRight />
        </Button>
      </div>
      <br />
    </div>
  );
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
    console.log(currentOptionIndex);
    console.log(category);
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
    <div
      style={{
        paddingLeft: '50px',
        paddingRight: '50px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <div className="character-customization">
        <h2 style={{ textAlign: 'center', paddingBottom: '20px' }}>
          Character Customization
        </h2>
        <div
          className="columns"
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <div className="column">
            <CustomizationOption
              category="eyebrows"
              label="Eyebrows"
              onPrevious={handleGoToPreviousOption}
              onNext={handleNextOption}
            />
            <CustomizationOption
              category="accessories"
              label="Accessories"
              onPrevious={handleGoToPreviousOption}
              onNext={handleNextOption}
            />
            <CustomizationOption
              category="accessoryColor"
              label="Accessory Color"
              onPrevious={handleGoToPreviousOption}
              onNext={handleNextOption}
            />
            <CustomizationOption
              category="eyes"
              label="Eyes"
              onPrevious={handleGoToPreviousOption}
              onNext={handleNextOption}
            />
            <CustomizationOption
              category="top"
              label="Top/Hair"
              onPrevious={handleGoToPreviousOption}
              onNext={handleNextOption}
            />
            <CustomizationOption
              category="hairColor"
              label="Hair Color"
              onPrevious={handleGoToPreviousOption}
              onNext={handleNextOption}
            />
          </div>

          <div className="column">
            <CustomizationOption
              category="mouth"
              label="Mouth"
              onPrevious={handleGoToPreviousOption}
              onNext={handleNextOption}
            />

            <CustomizationOption
              category="facialHair"
              label="Facial Hair"
              onPrevious={handleGoToPreviousOption}
              onNext={handleNextOption}
            />
            <CustomizationOption
              category="facialHairColor"
              label="Facial Hair Color"
              onPrevious={handleGoToPreviousOption}
              onNext={handleNextOption}
            />
            <CustomizationOption
              category="skinColor"
              label="Skin Color"
              onPrevious={handleGoToPreviousOption}
              onNext={handleNextOption}
            />
            <CustomizationOption
              category="clothing"
              label="Clothes"
              onPrevious={handleGoToPreviousOption}
              onNext={handleNextOption}
            />
            <CustomizationOption
              category="clothesColor"
              label="Clothes Color"
              onPrevious={handleGoToPreviousOption}
              onNext={handleNextOption}
            />
          </div>
        </div>

        <div
          className="avatar-preview"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img src={avatar.toDataUriSync()} alt="" width="150" height="150" />
        </div>
      </div>

      <div>
        <DialogFooter
          style={{
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '15px',
          }}
        >
          <Button onClick={previousStep} variant="secondary">
            {t('previous')}
          </Button>
          <Button onClick={nextStep}>{t('continue')}</Button>
        </DialogFooter>
      </div>
    </div>
  );
}
