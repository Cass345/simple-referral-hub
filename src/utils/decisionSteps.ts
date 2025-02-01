interface Option {
    text: string;
    next: string;
  }
  
  interface Step {
    question: string;
    options: Option[];
  }
  
  export interface Result {
    title: string;
    contact?: string;
    instructions: string;
    requiresMTSS?: boolean;
  }
  
  export const decisionResults: Record<string, Result> = {
    mtss_referral: {
      title: 'MTSS Referral Required',
      contact: 'Erin Rousu; MTSS Team',
      instructions: 'Complete and submit the MTSS referral form. Begin taking data on student. Meet with the MTSS team.',
      requiresMTSS: true
    },
    ip_iep_interventions: {
      title: 'Short Term Interventions Required',
      contact: 'Erin Rousu; SPED Support Team',
      instructions: 'Contact Erin to request time at a SPED support team meeting. Attend SPED support team, create an intervention plan and data point to track. Reconvene with the SPED support team to review data and plan next steps.'
    },
    ip_iep_extended: {
      title: 'Extended Day Placement Review',
      contact: 'SPED Support Team',
      instructions: 'Go through the SPED support team process and the Referral for Possible Extended Day process.'
    },
    ip_iep_ilc: {
      title: 'ILC Placement Review',
      contact: 'School Psychologists',
      instructions: 'After conferring with the family and IEP team, fill out a Reevaluation Request Form and send it to the school psychologists.'
    },
    eceap_eval: {
      title: 'Parent Evaluation Request',
      contact: 'Parent; Erin Rousu; School Psychologists',
      instructions: 'Ask the parent to put the request in writing and forward to School Psychologists and to Erin, MTSS Coordinator.'
    },
    no_action: {
      title: 'No Further Action Required',
      instructions: 'No additional steps are needed at this time.'
    }
  };
  
  export const decisionSteps: Record<string, Step> = {
    start: {
      question: 'Is this an IP Student or an ECEAP Student?',
      options: [
        { text: 'IP Student', next: 'ip_check' },
        { text: 'ECEAP Student', next: 'eceap_check' }
      ]
    },
    ip_check: {
      question: 'Is the student on an IEP?',
      options: [
        { text: 'Yes', next: 'ip_iep_needs' },
        { text: 'No', next: 'ip_concerns' }
      ]
    },
    ip_iep_needs: {
      question: 'What is the current need?',
      options: [
        { text: 'Need short term interventions', next: 'ip_iep_interventions' },
        { text: 'Reevaluation for extended day placement', next: 'ip_iep_extended' },
        { text: 'Reevaluation for ILC placement or exit', next: 'ip_iep_ilc' }
      ]
    },
    ip_concerns: {
      question: 'Any concerns?',
      options: [
        { text: 'Yes', next: 'mtss_referral' },
        { text: 'No', next: 'no_action' }
      ]
    },
    eceap_check: {
      question: 'What are the concerns?',
      options: [
        { text: 'OT/PT/Adaptive/Cognitive/Language/Social concerns', next: 'mtss_referral' },
        { text: 'Speech concerns only', next: 'mtss_referral' },
        { text: 'Parent requests evaluation', next: 'eceap_eval' }
      ]
    }
  };