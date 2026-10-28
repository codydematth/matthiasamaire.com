'use client';

import Image from 'next/image';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { projects } from '@/data/portfolio';
import { STATION_MAP } from './config';
import { useSimStore } from './store';
import CityDialog from './city-dialog';
import styles from './city.module.css';

/** Portfolio content belongs to the screen UI, independent of the 3D camera. */
export default function StationDetails() {
  const current = useSimStore(s => s.currentStation);
  const mode = useSimStore(s => s.cameraMode);
  const exit = useSimStore(s => s.exitStation);
  const selected = useSimStore(s => s.selectedProjectId);
  const select = useSimStore(s => s.selectProject);
  const station = current ? STATION_MAP[current] : undefined;
  if (mode !== 'interior' || !station || !['office', 'cinema'].includes(station.kind)) return null;
  const project = projects.find(p => p.id === selected) ?? projects[0];
  return <CityDialog labelledBy="station-heading" onClose={exit}>
    <section className={`${styles.modal} ${styles.stationPanel}`}>
      <div className={styles.stationHeading}>
        <div><small>{station.kind === 'office' ? 'EXPERIENCE BOULEVARD' : 'PROJECT CINEMA'}</small>
          <h2 id="station-heading">{station.emoji} {station.label}</h2></div>
        <button className={styles.returnButton} onClick={exit}><ArrowLeft size={14}/> Back to roadster</button>
      </div>
      {station.kind === 'office' ? <>
        {(station.experience ?? []).map(experience => <article key={experience.title + experience.date} className={styles.experience}>
          <h3>{experience.title}</h3><p>{experience.companyName} · {experience.date}</p>
          <h4>Key Engineering Contributions:</h4>
          <ul>{experience.points.map(point => <li key={point}>{point}</li>)}</ul>
        </article>)}
        {!station.experience?.length && <p>More about this experience will be available soon.</p>}
      </> : project ? <>
        <div className={styles.projectPicker} aria-label="Choose a project">{projects.map(item =>
          <button key={item.id} aria-pressed={project.id === item.id} onClick={() => select(item.id)}>{item.title}</button>
        )}</div>
        <article className={styles.projectDetails}>
          <div className={styles.projectImage}><Image src={project.image} alt={project.title} fill sizes="(max-width: 640px) 85vw, 300px" className="object-cover" /></div>
          <div><h3>{project.title}</h3><p>{project.subTitle}</p><p>{project.description}</p>
            <div className={styles.tags}>{project.technologiesUsed.map(tech => <span key={tech}>{tech}</span>)}</div>
            {project.troubleshootingFocus[0] && <p><strong>Troubleshooting focus:</strong> {project.troubleshootingFocus[0]}</p>}
            <div className={styles.projectLinks}>
              {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">Launch app <ExternalLink size={13}/></a>}
              {project.codeUrl && <a href={project.codeUrl} target="_blank" rel="noopener noreferrer">Source code <ExternalLink size={13}/></a>}
            </div>
          </div>
        </article>
        <p>Cinema Selection Menu ({projects.length} Features)</p>
      </> : <p>Projects will be available soon.</p>}
    </section>
  </CityDialog>;
}
