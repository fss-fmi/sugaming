'use client';

import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { avataaars } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { Button } from '../../../common/server';
import { DialogFooter } from '../../../common/client';

const options = {
  mouth: ['default', 'smile', 'sad', 'serious', 'screamOpen'],
  top: ['hat', 'turban', 'hijab', 'bigHair', 'bob', 'straight01'],
  accessories: [
    'none',
    'prescription01',
    'prescription02',
    'roundGlasses',
    'sunglasses',
  ],
  hairColor: ['brown', 'black', 'blonde', 'red'],
  accessoryColor: ['black', 'blue', 'gray', 'green'],
};

interface CustomizationOptions {
  mouth: 'default' | 'smile' | 'sad' | 'serious' | 'screamOpen';
  top: 'hat' | 'turban' | 'hijab' | 'bigHair' | 'bob' | 'straight01';
  accessories:
    | 'none'
    | 'prescription01'
    | 'prescription02'
    | 'roundGlasses'
    | 'sunglasses';
  hairColor: 'brown' | 'black' | 'blonde' | 'red';
  accessoryColor: 'black' | 'blue' | 'gray' | 'green';
}

interface AvatarStepProps {
  previousStep: () => void;
  nextStep: () => void;
}

export function AvatarStep({ previousStep, nextStep }: AvatarStepProps) {
  const [customization, setCustomization] = useState<CustomizationOptions>({
    mouth: 'smile',
    top: 'hat',
    accessories: 'none',
    hairColor: 'brown',
    accessoryColor: 'black',
  });

  const handleCustomizationChange = (
    category: keyof CustomizationOptions,
    value: string,
  ) => {
    setCustomization({ ...customization, [category]: value });
  };

  const renderCustomizationOptions = (category: keyof CustomizationOptions) => {
    return options[category].map((option) => (
      <Button
        key={option}
        className={customization[category] === option ? 'selected' : ''}
        onClick={() => handleCustomizationChange(category, option)}
      >
        {option}
      </Button>
    ));
  };

  const t = useTranslations('site.onboarding-dialog.avatar-step');
  const avatar = createAvatar(avataaars, {
    seed: 'gosholosho',
    ...Object.fromEntries(
      Object.entries(customization).map(([key, value]) => [key, [value]]),
    ),
  });

  return (
    <>
      <div className="character-customization">
        <h2>Character Customization</h2>
        <div className="options">
          <h3>Mouth</h3>
          {renderCustomizationOptions('mouth')}
        </div>
        <div className="options">
          <h3>Top</h3>
          {renderCustomizationOptions('top')}
        </div>
        <div className="options">
          <h3>Accessories</h3>
          {renderCustomizationOptions('accessories')}
        </div>
        <div className="options">
          <h3>Hair Color</h3>
          {renderCustomizationOptions('hairColor')}
        </div>
        <div className="options">
          <h3>Accessory Color</h3>
          {renderCustomizationOptions('accessoryColor')}
        </div>
        <div className="avatar-preview">
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
