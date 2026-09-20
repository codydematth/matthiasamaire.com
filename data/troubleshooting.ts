export interface InvestigationEvidence {
  type: 'log' | 'code' | 'network' | 'metric';
  title: string;
  content: string;
}

export interface TroubleshootingEnvironment {
  os?: string;
  runtime?: string;
  framework?: string;
  toolsUsed: string[];
}

export interface TroubleshootingCaseStudy {
  id: string;
  title: string;
  slug: string;
  category: 'API & Networking' | 'Authentication & Security' | 'Mobile & Device' | 'Frontend & State' | 'CI/CD & DevOps';
  status: 'In Progress' | 'Investigating' | 'Resolved' | 'Published';
  dateAdded: string;
  summary: string;

  // The 12 Required Pillars
  problemIncident: string;
  expectedBehavior: string;
  actualBehavior: string;
  environment: TroubleshootingEnvironment;
  reproductionSteps: string[];
  evidence: InvestigationEvidence[];
  investigation: string;
  hypotheses: string[];
  rootCause: string;
  resolution: string;
  verification: string;
  preventionLessonsLearned: string[];
}

/**
 * Troubleshooting Cases Repository
 * Genuine case studies are added here as investigations are completed.
 * No fabricated cases are added.
 */
export const troubleshootingCases: TroubleshootingCaseStudy[] = [];

/**
 * The 12-Step Systematic Investigation Framework utilized in the Troubleshooting Lab
 */
export const troubleshootingMethodology = [
  {
    step: '01',
    title: 'Incident Definition',
    desc: 'Clearly articulate the user symptom, error signal, or system failure with objective boundary conditions.'
  },
  {
    step: '02',
    title: 'Expected vs. Actual',
    desc: 'Define the intended contract (RFC, API specification, UX flow) and contrast directly against actual runtime behavior.'
  },
  {
    step: '03',
    title: 'Environment Isolation',
    desc: 'Document client runtime, OS, network conditions, dependency versions, and auth tenant configuration.'
  },
  {
    step: '04',
    title: 'Minimal Reproduction',
    desc: 'Build isolated, repeatable reproduction scenarios or curl/Postman scripts stripping non-essential factors.'
  },
  {
    step: '05',
    title: 'Evidence Gathering',
    desc: 'Capture HTTP headers, network traces, console logs, stack traces, and memory profiles.'
  },
  {
    step: '06',
    title: 'Investigation Deep-Dive',
    desc: 'Trace control flow through middleware, state transitions, event loops, and network boundaries.'
  },
  {
    step: '07',
    title: 'Hypothesis Formulation',
    desc: 'Formulate hypotheses rank-ordered by probability and system surface area.'
  },
  {
    step: '08',
    title: 'Root Cause Analysis',
    desc: 'Pinpoint the precise flaw — whether race condition, token expiry, CORS misconfiguration, or payload mutation.'
  },
  {
    step: '09',
    title: 'Targeted Resolution',
    desc: 'Formulate minimal, robust code or architectural fix that directly resolves the underlying failure.'
  },
  {
    step: '10',
    title: 'Rigorous Verification',
    desc: 'Confirm the resolution by verifying behavior under identical reproduction conditions and edge states.'
  },
  {
    step: '11',
    title: 'Workflow Validation',
    desc: 'Perform thorough end-to-end validation across related flows to confirm system stability and prevent side-effects.'
  },
  {
    step: '12',
    title: 'Prevention & Knowledge Sharing',
    desc: 'Document lessons learned, update team runbooks, and identify broader architectural enhancements.'
  }
];
