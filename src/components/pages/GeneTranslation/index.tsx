import { Accordion, AccordionButton, AccordionItem, AccordionPanel, Box, Text } from '@chakra-ui/react';
import BasicTemplate from '../../templates/BasicTemplate';
import TableCusTom from '../../molecules/Table';
import SearchTranslationForm from '../../organisms/SearchTranslationForm/index copy';
import { SearchTranslationFormType } from '../../../type/gene';

const GeneTranslation = () => {
    const handleSubmit = (data: SearchTranslationFormType) => {
        console.log(data);
    };
    return (
        <BasicTemplate size="medium">
            <Accordion allowMultiple mb={10}>
                <AccordionItem>
                    <AccordionButton>
                        <Text flex="1" textAlign="left" fontSize={24}>
                            Background and methods
                        </Text>
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                        <Text mb={4}>
                            The set of allelic genes found in multiple individuals in a species or closely related
                            species may be called a "pangene set," with the gene models that correspond by homology and
                            position being called a pangene. The pangene set calculated for Glycine accessions at
                            SoyBase can be used to find corresponding genes across assemblies and annotations.
                        </Text>
                        <Text mb={4}>
                            If you have one or several (fewer than 100) genes to look up, use the Pangene Lookup tool
                            below. This page accepts a list of genes (separated by spaces or line returns).
                        </Text>
                        <Text mb={4}>
                            If you have hundreds or thousands of genes to look up, you can download a correspondence
                            table for either the reference lines, or for a correspondence table for all pangene
                            accessions.
                        </Text>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>

            <Accordion allowMultiple>
                <AccordionItem>
                    <AccordionButton>
                        <Text flex="1" textAlign="left" fontSize={24}>
                            Pangene Lookup
                        </Text>
                    </AccordionButton>

                    <AccordionPanel pb={4}>
                        <Box>
                            <Text fontSize={24} mb={10}>
                                Gene Model Translation / Correspondence
                            </Text>
                            <SearchTranslationForm onSubmit={handleSubmit} mb={6} />
                            <TableCusTom
                                columns={[
                                    {
                                        key: 'input',
                                        label: 'Input',
                                    },
                                    {
                                        key: 'pan_gene_set',
                                        label: 'PanGene Set',
                                    },
                                    {
                                        key: 'target',
                                        label: 'Target',
                                    },
                                ]}
                                data={[]}
                            />
                        </Box>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </BasicTemplate>
    );
};

export default GeneTranslation;
