'use client';

import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { avataaars } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { Button } from '../../../common/server';
import { DialogFooter } from '../../../common/client';

const options = {
  mouth: ['default', 'smile', 'sad', 'serious', 'screamOpen', 'tongue'],
  top: ['hat', 'turban', 'hijab', 'bigHair', 'bob', 'straight01'],
  accessories: [
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
    'closed',
    'cry',
    'default',
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
    'beardLight',
    'beardMajestic',
    'beardMedium',
    'moustacheFancy',
    'moustacheMagnum',
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
          justifyContent: 'space-between', // Equal space between items
        }}
      >
        <Button onClick={() => onPrevious(category)}>
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
  });

  return (
    <>
      <div className="character-customization">
        <h2>Character Customization</h2>
        <CustomizationOption
          category="eyebrows"
          label="Eyebrows"
          onPrevious={handleGoToPreviousOption}
          onNext={handleNextOption}
        />
        <CustomizationOption
          category="accessories"
          label="Accessories person"
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
          category="accessoryColor"
          label="Accessory Color"
          onPrevious={handleGoToPreviousOption}
          onNext={handleNextOption}
        />
        <CustomizationOption
          category="hairColor"
          label="Hair Color"
          onPrevious={handleGoToPreviousOption}
          onNext={handleNextOption}
        />
        <CustomizationOption
          category="mouth"
          label="Mouth"
          onPrevious={handleGoToPreviousOption}
          onNext={handleNextOption}
        />
        <CustomizationOption
          category="top"
          label="Top"
          onPrevious={handleGoToPreviousOption}
          onNext={handleNextOption}
        />
        <CustomizationOption
          category="facialHair"
          label="Facial Hair"
          onPrevious={handleGoToPreviousOption}
          onNext={handleNextOption}
        />

        <div
          className="avatar-preview"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative', // Ensure parent has position set
            zIndex: 0, // Set lower z-index for the avatar-preview
          }}
        >
          <img src={avatar.toDataUriSync()} alt="" width="100" height="100" />
        </div>
      </div>

      <DialogFooter>
        <Button onClick={previousStep} variant="secondary">
          {t('previous')}
        </Button>
        <Button onClick={nextStep}>{t('continue')}</Button>
      </DialogFooter>
    </>
  );
}
