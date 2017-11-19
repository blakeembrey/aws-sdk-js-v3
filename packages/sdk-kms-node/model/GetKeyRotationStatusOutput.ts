import {Structure as _Structure_} from '@aws/types';

export const GetKeyRotationStatusOutput: _Structure_ = {
    type: 'structure',
    required: [],
    members: {
        KeyRotationEnabled: {
            shape: {
                type: 'boolean',
            },
        },
    },
};