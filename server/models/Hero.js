const supabase = require('../config/supabase');

const mapHero = (row) => {
  if (!row) return null;
  return {
    _id: row.id,
    id: row.id,
    heading: row.heading,
    subheading: row.subheading,
    ctaText: row.cta_text,
    ctaLink: row.cta_link,
    profileImage: row.profile_image,
    updatedAt: row.updated_at
  };
};

const toDb = (fields) => {
  const out = {};
  if (fields.heading !== undefined) out.heading = fields.heading;
  if (fields.subheading !== undefined) out.subheading = fields.subheading;
  if (fields.ctaText !== undefined) out.cta_text = fields.ctaText;
  if (fields.ctaLink !== undefined) out.cta_link = fields.ctaLink;
  if (fields.profileImage !== undefined) out.profile_image = fields.profileImage;
  return out;
};

class Hero {
  static async findOne() {
    const { data, error } = await supabase.from('hero').select('*').limit(1).maybeSingle();
    if (error) throw error;
    return mapHero(data);
  }

  static async create(fields = {}) {
    const payload = {
      heading: fields.heading ?? 'Hello, I am',
      subheading: fields.subheading ?? 'Full Stack Developer',
      cta_text: fields.ctaText ?? 'View My Work',
      cta_link: fields.ctaLink ?? '#portfolio',
      profile_image: fields.profileImage ?? 'default-avatar.png'
    };
    const { data, error } = await supabase.from('hero').insert(payload).select().single();
    if (error) throw error;
    return mapHero(data);
  }

  static async update(id, fields) {
    const { data, error } = await supabase
      .from('hero')
      .update(toDb(fields))
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return mapHero(data);
  }

  static async deleteAll() {
    const { error } = await supabase.from('hero').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    if (error) throw error;
  }
}

module.exports = Hero;
