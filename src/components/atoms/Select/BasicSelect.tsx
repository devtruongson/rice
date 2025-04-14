import { Box, Select, SelectProps, Text } from '@chakra-ui/react';

type Props = {
    label: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    options: { label: string; value: string }[];
} & SelectProps;
const BasicSelect = ({ label, value, onChange, options, ...props }: Props) => {
    return (
        <Box>
            <Text mb={3} textTransform="capitalize">
                {label}
            </Text>
            <Select value={value} onChange={onChange} placeholder={''} {...props}>
                {options?.length > 0
                    ? options?.map((item) => {
                          return (
                              <option key={item.value} value={item.value}>
                                  {item.label}
                              </option>
                          );
                      })
                    : null}
            </Select>
        </Box>
    );
};

export default BasicSelect;
