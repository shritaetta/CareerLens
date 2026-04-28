import React from 'react';
import { Mail, Phone, Link as LinkIcon, MapPin } from 'lucide-react';
import './ResumeTemplate.css';

const ResumeTemplate = ({ data, onUpdate }) => {

  const generateSummary = () => {
    if (data.professional_summary) return data.professional_summary;
    const skillSample = data.skills?.slice(0, 3).join(', ') || '';
    const interestSample = data.interests?.slice(0, 2).join(' and ') || '';
    
    let gen = `Driven professional `;
    if (skillSample) gen += `highly skilled in ${skillSample}. `;
    if (interestSample) gen += `Passionate about exploring ${interestSample}. `;
    gen += `Seeking dynamic opportunities to leverage my technical toolkit and deliver impactful solutions.`;
    return gen;
  };

  const handleBasicInfoUpdate = (field, value) => {
    if (!onUpdate) return;
    onUpdate({
      ...data,
      basic_info: { ...data.basic_info, [field]: value }
    });
  };

  const handleArrayUpdate = (arrayName, idx, field, value) => {
    if (!onUpdate) return;
    const newArr = [...(data[arrayName] || [])];
    if (field === null) {
        newArr[idx] = value;
    } else {
        newArr[idx] = { ...newArr[idx], [field]: value };
    }
    onUpdate({ ...data, [arrayName]: newArr });
  };

  const handleSimpleUpdate = (field, value) => {
    if (!onUpdate) return;
    onUpdate({ ...data, [field]: value });
  };

  return (
    <div className="resume-a4-surface" id="resume-document">
      
      {/* HEADER SECTION */}
      <header className="resume-header">
        <h1 
          contentEditable suppressContentEditableWarning className="res-name"
          onBlur={(e) => {
             const parts = e.target.innerText.trim().split(' ');
             handleBasicInfoUpdate('first_name', parts[0] || '');
             handleBasicInfoUpdate('last_name', parts.slice(1).join(' ') || '');
          }}
        >
          {data.basic_info.first_name} {data.basic_info.last_name}
        </h1>
        <div className="res-contact-info">
          {data.basic_info.email && (
            <span className="contact-item">
              <Mail size={12} className="res-icon" /> 
              <span contentEditable suppressContentEditableWarning onBlur={(e) => handleBasicInfoUpdate('email', e.target.innerText)}>{data.basic_info.email}</span>
            </span>
          )}
          {data.basic_info.phone && (
            <span className="contact-item">
              <Phone size={12} className="res-icon" /> 
              <span contentEditable suppressContentEditableWarning onBlur={(e) => handleBasicInfoUpdate('phone', e.target.innerText)}>{data.basic_info.phone}</span>
            </span>
          )}
          {data.basic_info.linkedin && (
            <span className="contact-item">
              <LinkIcon size={12} className="res-icon" /> 
              <span contentEditable suppressContentEditableWarning onBlur={(e) => handleBasicInfoUpdate('linkedin', e.target.innerText)}>{data.basic_info.linkedin}</span>
            </span>
          )}
          {data.basic_info.github && (
            <span className="contact-item">
              <LinkIcon size={12} className="res-icon" /> 
              <span contentEditable suppressContentEditableWarning onBlur={(e) => handleBasicInfoUpdate('github', e.target.innerText)}>{data.basic_info.github.replace('https://github.com/', '')}</span>
            </span>
          )}
        </div>
      </header>
      
      <div className="resume-body">
        
        {/* SUMMARY SECTION */}
        <section className="resume-section">
          <h2 className="section-title">PROFILE</h2>
          <p contentEditable suppressContentEditableWarning className="section-content text-justify" onBlur={(e) => handleSimpleUpdate('professional_summary', e.target.innerText)}>
            {generateSummary()}
          </p>
        </section>

        {/* EDUCATION SECTION */}
        {data.education && data.education.length > 0 && (
          <section className="resume-section">
            <h2 className="section-title">EDUCATION</h2>
            <div className="section-content">
              {data.education.map((edu, idx) => (
                <div key={idx} className="resume-item">
                  <div className="split-row">
                    <span className="item-title" contentEditable suppressContentEditableWarning onBlur={(e) => handleArrayUpdate('education', idx, 'institution', e.target.innerText)}>{edu.institution}</span>
                    <span className="item-date italic" contentEditable suppressContentEditableWarning onBlur={(e) => handleArrayUpdate('education', idx, 'grad_year', e.target.innerText)}>{edu.grad_year}</span>
                  </div>
                  <div className="split-row">
                    <span className="item-org italic" contentEditable suppressContentEditableWarning onBlur={(e) => handleArrayUpdate('education', idx, 'degree', e.target.innerText)}>{edu.degree}</span>
                    <span className="item-detail bold" contentEditable suppressContentEditableWarning onBlur={(e) => handleArrayUpdate('education', idx, 'score', e.target.innerText)}>{edu.score && !edu.score.includes('Score') ? `Score: ${edu.score}` : edu.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* PROJECTS SECTION */}
        {data.projects && data.projects.length > 0 && (
          <section className="resume-section">
            <h2 className="section-title">PROJECTS</h2>
            <div className="section-content">
              {data.projects.map((proj, idx) => (
                <div key={idx} className="resume-item project-item">
                  <div className="split-row">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                       <span className="item-title" contentEditable suppressContentEditableWarning onBlur={(e) => handleArrayUpdate('projects', idx, 'title', e.target.innerText)}>{proj.title}</span>
                    </div>
                    {proj.duration && <span className="item-date italic" contentEditable suppressContentEditableWarning onBlur={(e) => handleArrayUpdate('projects', idx, 'duration', e.target.innerText)}>{proj.duration}</span>}
                  </div>
                  <div className="project-description">
                     <p contentEditable suppressContentEditableWarning onBlur={(e) => handleArrayUpdate('projects', idx, 'description', e.target.innerText)}>{proj.description}</p>
                     {proj.tech && (
                        <p className="tech-stack">
                           <strong>Tools Used:</strong> <span contentEditable suppressContentEditableWarning onBlur={(e) => handleArrayUpdate('projects', idx, 'tech', e.target.innerText)}>{proj.tech}</span>
                        </p>
                     )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* EXPERIENCE SECTION */}
        {data.experience && data.experience.length > 0 && (
          <section className="resume-section">
            <h2 className="section-title">EXPERIENCE</h2>
            <div className="section-content">
              {data.experience.map((exp, idx) => (
                <div key={idx} className="resume-item">
                  <div className="split-row">
                    <span className="item-title" contentEditable suppressContentEditableWarning onBlur={(e) => handleArrayUpdate('experience', idx, 'title', e.target.innerText)}>{exp.title}</span>
                    <span className="item-date italic" contentEditable suppressContentEditableWarning onBlur={(e) => handleArrayUpdate('experience', idx, 'duration', e.target.innerText)}>{exp.duration}</span>
                  </div>
                  <div className="split-row">
                    <span className="item-org italic" contentEditable suppressContentEditableWarning onBlur={(e) => handleArrayUpdate('experience', idx, 'company', e.target.innerText)}>{exp.company}</span>
                  </div>
                  <p contentEditable suppressContentEditableWarning onBlur={(e) => handleArrayUpdate('experience', idx, 'description', e.target.innerText)}>{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SKILLS SECTION */}
        {data.skills && data.skills.length > 0 && (
          <section className="resume-section">
            <h2 className="section-title">SKILLS & TECHNOLOGIES</h2>
            <div className="section-content">
              {typeof data.skills[0] === 'string' ? (
                  <p contentEditable suppressContentEditableWarning onBlur={(e) => {
                     const arr = e.target.innerText.split('•').map(s => s.trim()).filter(Boolean);
                     handleSimpleUpdate('skills', arr);
                  }}>
                    {data.skills.join(' • ')}
                  </p>
              ) : (
                  <div className="skills-grid">
                     {data.skills.map((group, idx) => (
                        <div key={idx} className="skill-group">
                           <strong contentEditable suppressContentEditableWarning onBlur={(e) => {
                              const newSkills = [...data.skills];
                              newSkills[idx] = { ...group, category: e.target.innerText.replace(':', '').trim() };
                              handleSimpleUpdate('skills', newSkills);
                           }}>{group.category}:</strong>
                           <span contentEditable suppressContentEditableWarning onBlur={(e) => {
                              const arr = e.target.innerText.split(',').map(s => s.trim()).filter(Boolean);
                              const newSkills = [...data.skills];
                              newSkills[idx] = { ...group, skills: arr };
                              handleSimpleUpdate('skills', newSkills);
                           }}> {group.skills.join(', ')}</span>
                        </div>
                     ))}
                  </div>
              )}
            </div>
          </section>
        )}

        {/* ACHIEVEMENTS/CERTIFICATES */}
        {(data.achievements?.length > 0 || data.certificates?.length > 0) && (
          <section className="resume-section">
            <h2 className="section-title">CERTIFICATIONS & ACHIEVEMENTS</h2>
            <div className="section-content">
               <ul className="list-content">
                  {data.certificates?.map((cert, idx) => {
                     const certText = typeof cert === 'string' ? cert : (cert.display_name || cert.filename || 'Certificate');
                     return (
                       <li key={`cert-${idx}`} contentEditable suppressContentEditableWarning onBlur={(e) => handleArrayUpdate('certificates', idx, null, e.target.innerText)}>{certText}</li>
                     );
                  })}
                  {data.achievements?.map((ach, idx) => (
                    <li key={`ach-${idx}`} contentEditable suppressContentEditableWarning onBlur={(e) => handleArrayUpdate('achievements', idx, null, e.target.innerText)}>{ach}</li>
                  ))}
               </ul>
            </div>
          </section>
        )}

      </div>
    </div>
  );
};

export default ResumeTemplate;
