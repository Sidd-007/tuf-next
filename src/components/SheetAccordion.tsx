'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import SheetTable from '@/components/SheetTable';
import type { SheetStep } from '@/types/sheet';

/** Renders Step ▸ Lec ▸ Table structure */
export default function SheetAccordion({ sheet }: { sheet: SheetStep[] }) {
  if (!sheet?.length) return null;

  return (
    <Accordion
      type="multiple"                 // many steps can stay open
      className="space-y-4"
      defaultValue={[`step-${sheet[0].step_no}`]}  /* open first step */
    >
      {sheet.map((step) => (
        <AccordionItem
          key={step.step_no}
          value={`step-${step.step_no}`}
          className="border border-muted/40 rounded-lg"
        >
          <AccordionTrigger className="px-4 py-3 text-lg font-semibold">
            {`Step ${step.step_no} : ${step.step_title}`}
          </AccordionTrigger>

          <AccordionContent className="space-y-4 pt-2">
            {/* nested accordion for lectures */}
            <Accordion
              type="multiple"
              className="ml-4 space-y-2"
            >
              {step.sub_steps.map((lec) => (
                <AccordionItem
                  key={lec.sub_step_no}
                  value={`step-${step.step_no}-lec-${lec.sub_step_no}`}
                >
                  <AccordionTrigger className="px-4 py-2 text-base font-medium">
                    {`Lec ${lec.sub_step_no} : ${lec.sub_step_title}`}
                  </AccordionTrigger>

                  <AccordionContent className="pt-2">
                    <SheetTable topics={lec.topics} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
