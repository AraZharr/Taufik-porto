const supabase = require('../config/supabase');

const mapAbout = (row) => {
  if (!row) return null;
  return {
    _id: row.id,
    id: row.id,
    description: row.description,
    image: row.image,
    extraInfo: row.extra_info,
    updatedAt: row.updated_at
  };
};

const toDb = (fields) => {
  const out = {};
  if (fields.description !== undefined) out.description = fields.description;
  if (fields.image !== undefined) out.image = fields.image;
  if (fields.extraInfo !== undefined) out.extra_info = fields.extraInfo;
  return out;
};

class About {
  static async findOne() {
    const { data, error } = await supabase.from('about').select('*').limit(1).maybeSingle();
    if (error) throw error;
    return mapAbout(data);
  }

  static async create(fields = {}) {
    const payload = {
      description: fields.description ?? 'Write about yourself here...',
      image: fields.image ?? 'default-about.png',
      extra_info: fields.extraInfo ?? ''
    };
    const { data, error } = await supabase.from('about').insert(payload).select().single();
    if (error) throw error;
    return mapAbout(data);
  }

  static async update(id, fields) {
    const { data, error } = await supabase
      .from('about')
      .update(toDb(fields))
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return mapAbout(data);
  }

  static async deleteAll() {
    const { error } = await supabase.from('about').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    if (error) throw error;
  }
}

module.exports = About;
